
import { FilingVersion } from '@cfl/document-service';

export default interface OimState {
  filingVersion?: FilingVersion;
  documentContents?: string;
  message?: string;
}
