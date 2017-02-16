import { CustomConfig } from 'ng2-ui-auth';
/**
 * Created by VoidZero on 09/02/2017.
 */

export const GOOGLE_CLIENT_ID = '64504024589-1oukh9057md9e2g1rrads4ppufdv3ge2.apps.googleusercontent.com';
const baseUrl = "http://localhost:3000/api/auth/google"
export class MyAuthConfig extends CustomConfig {
    defaultHeaders = {'Content-Type': 'application/json'};
    providers = {google: { clientId: GOOGLE_CLIENT_ID, url: baseUrl }};
}