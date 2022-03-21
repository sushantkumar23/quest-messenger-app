const assert = require("assert")
const anchor = require("@project-serum/anchor")
const { SystemProgram } = anchor.web3

describe("quest-messenger-app", () => {
  // Configure the client to use the local cluster.
  const provider = anchor.Provider.env()
  anchor.setProvider(provider)
  const program = anchor.workspace.QuestMessengerApp

  it("an account is initialized!", async () => {
    // Add your test here.
    const baseAccount = anchor.web3.Keypair.generate()
    await program.rpc.initialize("My first message", {
      accounts: {
        baseAccount: baseAccount.publicKey,
        user: provider.wallet.publicKey,
        systemProgram: SystemProgram.programId,
      },
      signers: [baseAccount],
    })
    const account = await program.account.baseAccount.fetch(
      baseAccount.publicKey
    )
    console.log("Data: ", account.data)
    assert.ok(account.data === "My first message")
    _baseAccount = baseAccount
  })

  it("update the account previously created!", async () => {
    const baseAccount = _baseAccount

    await program.rpc.update("My second message", {
      accounts: {
        baseAccount: baseAccount.publicKey,
      },
    })

    const account = await program.account.baseAccount.fetch(
      baseAccount.publicKey
    )
    console.log("Updated data: ", account.data)
    assert.ok(account.data === "My second message")
    console.log("All account data: ", account)
    console.log("All data: ", account.dataList)
    assert.ok(account.dataList.length === 2)
  })
})
