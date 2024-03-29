import type { PropertyValues } from 'lit';
import type { MetricsResult } from 'mutation-testing-metrics';
import type { Thresholds } from 'mutation-testing-report-schema/api';
import { RealTimeElement } from '../real-time-element.js';
export type TableWidth = 'normal' | 'large';
export type ColumnCategory = 'percentage' | 'number';
export type Numbers<TMetrics> = {
    [Prop in keyof TMetrics as TMetrics[Prop] extends number ? Prop : never]: TMetrics[Prop];
};
export interface Column<TMetric> {
    key: keyof Numbers<TMetric> & keyof TMetric;
    label: string;
    tooltip?: string;
    width?: TableWidth;
    category: ColumnCategory;
    isBold?: true;
}
export declare class MutationTestReportTestMetricsTable<TFile, TMetric> extends RealTimeElement {
    model?: MetricsResult<TFile, TMetric>;
    currentPath: string[];
    columns: Column<TMetric>[];
    thresholds: Thresholds;
    static styles: import("lit").CSSResult[];
    constructor();
    private hasMultipleColspan;
    willUpdate(changedProperties: PropertyValues): void;
    render(): import("lit-html").TemplateResult<1>;
    private renderTableHeadRow;
    private renderTableHead;
    private renderTableBody;
    private renderRow;
    private renderCell;
    private determineBgColoringClass;
    private determineTextColoringClass;
}
//# sourceMappingURL=metrics-table.component.d.ts.map