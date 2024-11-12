
import { http, HttpResponse } from 'msw';
import { AuthEndpoints, Controllers } from '../../constants';
import { buildUrl } from './utils';
import { UserModel } from '../../interfaces';
import { userMockData } from '../dataMocks';

const authHandlers = [
    http.post(buildUrl(Controllers.Auth),
        async ({ request }) => {
            const data = await request.json() as UserModel;
            if (data?.email === userMockData.getFailingUser().email) {
                return new HttpResponse(null, { status: 500 });
            }
            return new HttpResponse(null, { status: 200 });
        }
    ),
    http.post(buildUrl(Controllers.Auth, AuthEndpoints.Login),
        async ({ request }) => {
            const data = await request.json() as UserModel;
            if (data?.email === userMockData.getFailingUser().email) {
                return new HttpResponse(null, { status: 500 });
            }
            return HttpResponse.text("token");
        }
    ),
    http.post(buildUrl(Controllers.Auth, AuthEndpoints.Logout),
        () => {
            return new HttpResponse(null, { status: 200 });
        }
    ),
    http.post(buildUrl(Controllers.Auth, AuthEndpoints.GenerateToken),
        () => {
            return HttpResponse.text("token");
        }
    ),
];

export default authHandlers;
