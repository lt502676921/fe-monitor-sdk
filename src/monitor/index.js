import { injectJsError } from './lib/jsError';
import { injectXHR } from './lib/xhr';
import { injectBlankScreen } from './lib/blankScreen';
import { timing } from './lib/timing';

injectJsError();
injectXHR();
injectBlankScreen();
timing();
