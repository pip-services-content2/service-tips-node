import { CommandSet } from 'pip-services3-commons-nodex';
import { ICommand } from 'pip-services3-commons-nodex';
import { Command } from 'pip-services3-commons-nodex';
import { Parameters } from 'pip-services3-commons-nodex';
import { FilterParams } from 'pip-services3-commons-nodex';
import { PagingParams } from 'pip-services3-commons-nodex';
import { ObjectSchema } from 'pip-services3-commons-nodex';
import { TypeCode } from 'pip-services3-commons-nodex';
import { FilterParamsSchema } from 'pip-services3-commons-nodex';
import { PagingParamsSchema } from 'pip-services3-commons-nodex';

import { TipV1Schema } from '../data/version1/TipV1Schema';
import { ITipsController } from './ITipsController';

export class TipsCommandSet extends CommandSet {
    private _logic: ITipsController;

	constructor(logic: ITipsController) {
		super();

		this._logic = logic;

		// Register commands to the database
		this.addCommand(this.makeGetTipsCommand());
		this.addCommand(this.makeGetRandomTipCommand());
		this.addCommand(this.makeGetTipByIdCommand());
		this.addCommand(this.makeCreateTipCommand());
		this.addCommand(this.makeUpdateTipCommand());
		this.addCommand(this.makeDeleteTipByIdCommand());
	}

	private makeGetTipsCommand(): ICommand {
		return new Command(
			"get_tips",
			new ObjectSchema(true)
				.withOptionalProperty('filter', new FilterParamsSchema())
				.withOptionalProperty('paging', new PagingParamsSchema()),
			async (correlationId: string, args: Parameters) => {
				let filter = FilterParams.fromValue(args.get("filter"));
				let paging = PagingParams.fromValue(args.get("paging"));
				return await this._logic.getTips(correlationId, filter, paging);
			}
		);
	}

	private makeGetRandomTipCommand(): ICommand {
		return new Command(
			"get_random_tip",
			new ObjectSchema(true)
				.withOptionalProperty('filter', new FilterParamsSchema()),
			async (correlationId: string, args: Parameters) => {
				let filter = FilterParams.fromValue(args.get("filter"));
				return await this._logic.getRandomTip(correlationId, filter);
			}
		);
	}

	private makeGetTipByIdCommand(): ICommand {
		return new Command(
			"get_tip_by_id",
			new ObjectSchema(true)
				.withRequiredProperty('tip_id', TypeCode.String),
			async (correlationId: string, args: Parameters) => {
				let tipId = args.getAsNullableString("tip_id");
				return await this._logic.getTipById(correlationId, tipId);
			}
		);
	}

	private makeCreateTipCommand(): ICommand {
		return new Command(
			"create_tip",
			new ObjectSchema(true)
				.withRequiredProperty('tip', new TipV1Schema()),
			async (correlationId: string, args: Parameters) => {
				let tip = args.get("tip");
				return await this._logic.createTip(correlationId, tip);
			}
		);
	}

	private makeUpdateTipCommand(): ICommand {
		return new Command(
			"update_tip",
			new ObjectSchema(true)
				.withRequiredProperty('tip', new TipV1Schema()),
			async (correlationId: string, args: Parameters) => {
				let tip = args.get("tip");
				return await this._logic.updateTip(correlationId, tip);
			}
		);
	}

	private makeDeleteTipByIdCommand(): ICommand {
		return new Command(
			"delete_tip_by_id",
			new ObjectSchema(true)
				.withRequiredProperty('tip_id', TypeCode.String),
			async (correlationId: string, args: Parameters) => {
				let tipId = args.getAsNullableString("tip_id");
				return await this._logic.deleteTipById(correlationId, tipId);
			}
		);
	}

}