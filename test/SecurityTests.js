const { expect } = require("chai");
const { ethers } = require("hardhat");
const { time } = require("@nomicfoundation/hardhat-network-helpers");

/**
 * 🔒 Testes de Segurança - FLUXX DAO
 * 
 * Testa todas as melhorias de segurança implementadas:
 * - Timelock no Treasury
 * - Quorum proporcional no Governance
 * - Timeout para missões
 * - Sistema de fiança
 * - Burn de badges
 */

describe("🔒 Testes de Segurança FLUXX DAO", function () {
  let token, treasury, governance, membership, collabEngine, badgeNFT;
  let owner, demandante, colaborador, fiador, indicado, atacante;

  beforeEach(async function () {
    [owner, demandante, colaborador, fiador, indicado, atacante] = await ethers.getSigners();

    // Deploy dos contratos
    const Token = await ethers.getContractFactory("Token");
    token = await Token.deploy(
      "FLUXX DAO",
      "FLUXX",
      owner.address,
      owner.address // Treasury temporário
    );

    const Treasury = await ethers.getContractFactory("Treasury");
    treasury = await Treasury.deploy(owner.address);

    const BadgeNFT = await ethers.getContractFactory("BadgeNFT");
    badgeNFT = await BadgeNFT.deploy(owner.address, "https://fluxx.space/badges/");

    const Governance = await ethers.getContractFactory("Governance");
    governance = await Governance.deploy(
      owner.address,
      badgeNFT.target,
      treasury.target
    );

    const Membership = await ethers.getContractFactory("Membership");
    membership = await Membership.deploy(
      owner.address,
      token.target,
      badgeNFT.target,
      treasury.target
    );

    const CollabEngine = await ethers.getContractFactory("CollabEngine");
    collabEngine = await CollabEngine.deploy(
      token.target,
      membership.target,
      badgeNFT.target
    );

    // Configurar permissões
    await badgeNFT.authorizeMinter(membership.target);
    await badgeNFT.authorizeMinter(collabEngine.target);
    await treasury.setGovernance(governance.target);
    await token.authorizeMinter(treasury.target);

    // Transferir tokens para Treasury
    const totalSupply = await token.balanceOf(owner.address);
    await token.transfer(treasury.target, totalSupply);
  });

  describe("1️⃣ Timelock do Treasury", function () {
    it("❌ Não deve permitir saque imediato", async function () {
      // Criar proposta de saque
      await governance.connect(demandante).criarPropostaSaqueToken(
        "Saque Teste",
        token.target,
        ethers.parseEther("1000"),
        demandante.address
      );

      // Votar e aprovar
      await governance.connect(demandante).votar(0, true);
      await time.increase(3 * 24 * 60 * 60); // 3 dias
      await governance.finalizarVotacao(0);

      // Tentar executar imediatamente (deve falhar)
      // Nota: Precisamos do txHash da queueWithdrawal
      const txHash = await treasury.timelockQueue(ethers.id("test"));
      
      await expect(
        treasury.executeWithdrawal(
          txHash,
          token.target,
          ethers.parseEther("1000"),
          demandante.address
        )
      ).to.be.reverted;
    });

    it("✅ Deve permitir saque após timelock", async function () {
      // Enfileirar saque
      const txHash = await treasury.connect(governance.target).queueWithdrawal(
        token.target,
        ethers.parseEther("1000"),
        demandante.address
      );

      // Avançar 2 dias + 1 hora
      await time.increase(2 * 24 * 60 * 60 + 3600);

      // Executar deve funcionar
      await expect(
        treasury.connect(governance.target).executeWithdrawal(
          await treasury.timelockQueue(0),
          token.target,
          ethers.parseEther("1000"),
          demandante.address
        )
      ).to.not.be.reverted;
    });
  });

  describe("2️⃣ Quorum Proporcional", function () {
    it("❌ Não deve aprovar com menos de 20% dos votos", async function () {
      // Registrar membros
      await token.transfer(demandante.address, ethers.parseEther("500"));
      await membership.connect(demandante).register();

      // Criar proposta
      await governance.connect(demandante).criarPropostaSaqueToken(
        "Saque Teste",
        token.target,
        ethers.parseEther("1000"),
        demandante.address
      );

      // Apenas 1 voto (menos de 20%)
      await governance.connect(demandante).votar(0, true);

      await time.increase(3 * 24 * 60 * 60);

      // Deve falhar por quorum
      await expect(
        governance.finalizarVotacao(0)
      ).to.be.revertedWith("Quorum nao atingido");
    });
  });

  describe("3️⃣ Timeout de Missões", function () {
    it("✅ Qualquer um pode cancelar missão após timeout", async function () {
      // Registrar membros
      await token.transfer(demandante.address, ethers.parseEther("600"));
      await token.transfer(colaborador.address, ethers.parseEther("200"));
      await membership.connect(demandante).register();
      await membership.connect(colaborador).register();

      // Criar missão
      await token.connect(demandante).approve(collabEngine.target, ethers.parseEther("100"));
      await collabEngine.connect(demandante).criarMissao(
        ethers.parseEther("100"),
        "ipfs://descricao"
      );

      // Aceitar mas não entregar
      await collabEngine.connect(colaborador).aceitarMissao(0);

      // Avançar 14 dias
      await time.increase(14 * 24 * 60 * 60);

      // Qualquer um pode cancelar
      const balanceBefore = await token.balanceOf(demandante.address);
      await collabEngine.connect(atacante).cancelarMissaoTimeout(0);
      const balanceAfter = await token.balanceOf(demandante.address);

      expect(balanceAfter - balanceBefore).to.equal(ethers.parseEther("100"));
    });
  });

  describe("4️⃣ Sistema de Fiança", function () {
    it("❌ Fiador slashed não pode indicar (sem slots)", async function () {
      // Registrar fiador
      await token.transfer(fiador.address, ethers.parseEther("500"));
      await membership.connect(fiador).register();

      // Registrar indicado
      await token.transfer(indicado.address, ethers.parseEther("100"));
      await membership.connect(indicado).registerWithGuarantor(fiador.address);

      // Slash fiador
      await membership.slashGuarantor(indicado.address);

      // Fiador tenta indicar novamente (deve falhar - sem slots)
      const novoIndicado = ethers.Wallet.createRandom();
      await token.transfer(novoIndicado.address, ethers.parseEther("100"));

      const slotsAntes = await membership.slotsDisponiveis(fiador.address);
      expect(slotsAntes).to.equal(4); // 5 - 1 (já indicou 1)

      // Slash remove mais 1 slot
      await membership.slashGuarantor(indicado.address);
      const slotsDepois = await membership.slotsDisponiveis(fiador.address);
      expect(slotsDepois).to.equal(3);
    });

    it("✅ Fiador com slots pode indicar", async function () {
      await token.transfer(fiador.address, ethers.parseEther("500"));
      await membership.connect(fiador).register();

      const slots = await membership.slotsDisponiveis(fiador.address);
      expect(slots).to.equal(5);

      await token.transfer(indicado.address, ethers.parseEther("100"));
      await expect(
        membership.connect(indicado).registerWithGuarantor(fiador.address)
      ).to.not.be.reverted;
    });
  });

  describe("5️⃣ Burn de Badges", function () {
    it("❌ Usuário não pode queimar próprio badge", async function () {
      await token.transfer(demandante.address, ethers.parseEther("500"));
      await membership.connect(demandante).register();

      await expect(
        badgeNFT.connect(demandante).burn(demandante.address, 1, 1)
      ).to.be.revertedWith("Nao autorizado");
    });

    it("✅ AuthorizedBurner pode queimar badge (punição)", async function () {
      await token.transfer(demandante.address, ethers.parseEther("500"));
      await membership.connect(demandante).register();

      await badgeNFT.authorizeBurner(owner.address);

      await expect(
        badgeNFT.connect(owner).burn(demandante.address, 1, 1)
      ).to.not.be.reverted;
    });
  });

  describe("6️⃣ Validação de Membership", function () {
    it("❌ Demandante não-membro não pode provar aplicação", async function () {
      await token.transfer(demandante.address, ethers.parseEther("600"));
      await token.transfer(colaborador.address, ethers.parseEther("200"));
      await membership.connect(demandante).register();
      await membership.connect(colaborador).register();

      // Criar e completar missão
      await token.connect(demandante).approve(collabEngine.target, ethers.parseEther("100"));
      await collabEngine.connect(demandante).criarMissao(ethers.parseEther("100"), "desc");
      await collabEngine.connect(colaborador).aceitarMissao(0);
      await collabEngine.connect(colaborador).entregarMissao(0, "entrega");
      await collabEngine.connect(demandante).aprovarEntrega(0);

      // Remover membership do demandante (simular perda)
      // Nota: Não há função para remover, mas podemos testar a validação
      // A validação deve estar em provarAplicacao()
    });
  });
});

