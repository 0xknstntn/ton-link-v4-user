import { Blockchain, SandboxContract, TreasuryContract } from '@ton/sandbox';
import { Cell, toNano } from '@ton/core';
import { TonLinkV4Users } from '../wrappers/TonLinkV4Users';
import '@ton/test-utils';
import { compile } from '@ton/blueprint';

describe('TonLinkV4Users', () => {
    let code: Cell;

    beforeAll(async () => {
        code = await compile('TonLinkV4Users');
    });

    let blockchain: Blockchain;
    let deployer: SandboxContract<TreasuryContract>;
    let tonLinkV4Users: SandboxContract<TonLinkV4Users>;

    beforeEach(async () => {
        blockchain = await Blockchain.create();

        deployer = await blockchain.treasury('deployer');

        tonLinkV4Users = blockchain.openContract(TonLinkV4Users.createFromConfig({
            oracle: deployer.address,
            admin: deployer.address,
        }, code));

        const deployResult = await tonLinkV4Users.sendDeploy(deployer.getSender(), toNano('0.05'));

        expect(deployResult.transactions).toHaveTransaction({
            from: deployer.address,
            to: tonLinkV4Users.address,
            deploy: true,
            success: true,
        });
    });

    it('should deploy', async () => {
        // the check is done inside beforeEach
        // blockchain and tonLinkV4Users are ready to use
    });
});
