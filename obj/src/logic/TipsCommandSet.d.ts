import { CommandSet } from 'pip-services3-commons-nodex';
import { ITipsController } from './ITipsController';
export declare class TipsCommandSet extends CommandSet {
    private _logic;
    constructor(logic: ITipsController);
    private makeGetTipsCommand;
    private makeGetRandomTipCommand;
    private makeGetTipByIdCommand;
    private makeCreateTipCommand;
    private makeUpdateTipCommand;
    private makeDeleteTipByIdCommand;
}
