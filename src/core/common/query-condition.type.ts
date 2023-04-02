import { WhereFilterOp } from '@google-cloud/firestore';

export type Condition = [string, WhereFilterOp, any];
