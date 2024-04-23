import { Address, beginCell, Cell, Contract, contractAddress, ContractProvider, Sender, SendMode } from '@ton/core';

export type TonLinkV4UsersConfig = { oracle: Address, admin: Address};

export function tonLinkV4UsersConfigToCell(config: TonLinkV4UsersConfig): Cell {
    return beginCell()
        .storeAddress(config.oracle)
        .storeAddress(config.admin)
        .storeUint(0, 64)
    .endCell();
}

export class TonLinkV4Users implements Contract {
    constructor(readonly address: Address, readonly init?: { code: Cell; data: Cell }) {}

    static createFromAddress(address: Address) {
        return new TonLinkV4Users(address);
    }

    static createFromConfig(config: TonLinkV4UsersConfig, code: Cell, workchain = 0) {
        const data = tonLinkV4UsersConfigToCell(config);
        const init = { code, data };
        return new TonLinkV4Users(contractAddress(workchain, init), init);
    }

    async sendDeploy(provider: ContractProvider, via: Sender, value: bigint) {
        await provider.internal(via, {
            value,
            sendMode: SendMode.PAY_GAS_SEPARATELY,
            body: beginCell().endCell(),
        });
    }
}
