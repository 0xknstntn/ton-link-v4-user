import { Address, toNano } from '@ton/core';
import { TonLinkV4Users } from '../wrappers/TonLinkV4Users';
import { compile, NetworkProvider } from '@ton/blueprint';

export async function run(provider: NetworkProvider) {
    const tonLinkV4Users = provider.open(TonLinkV4Users.createFromConfig({
        oracle: Address.parse("kQCIxdC5CyuiWH7MAWFc94Kafxy2BDruOsM46LNHsqdPXEyj"),
        admin: Address.parse("0QDO637bwRRWOxkOk_hzOm3R-RJ4-iqa_ep3VoAgMmVrs1CV")
    }, await compile('TonLinkV4Users')));

    await tonLinkV4Users.sendDeploy(provider.sender(), toNano('0.05'));

    await provider.waitForDeploy(tonLinkV4Users.address);

    // run methods on `tonLinkV4Users`
}
