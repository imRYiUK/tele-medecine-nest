declare function simpleSetup(): Promise<void>;
declare function runSetupForEnvironment(environment?: 'development' | 'production'): Promise<void>;
export { simpleSetup, runSetupForEnvironment };
