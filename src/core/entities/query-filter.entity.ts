import { WhereFilterOp } from '@google-cloud/firestore';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type QueryFilter = [string, WhereFilterOp, any];
