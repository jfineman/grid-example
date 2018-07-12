import { Tooltip } from './tooltip';
import { FiscalYearQuarterDatesSeparateViewModel } from './fiscal-year-quarter-dates';;

export class SaveResult<T, TS>
{
    //added
    public customMessage: string;

    public IsSuccess: boolean;
    public GridTooltips: Tooltip<T>[];
    public ItemTooltips: Tooltip<TS>[];
    public ItemName: string;
    public Information: string;
    public PkId: number;
    public PromotionCount: number;
    public FormNumber: number;
    public UpdatedFy: number;
    public DefaultQtr: number;
    public DefaultStartDate: Date;
    public UpdatedQtrs: FiscalYearQuarterDatesSeparateViewModel[];
}