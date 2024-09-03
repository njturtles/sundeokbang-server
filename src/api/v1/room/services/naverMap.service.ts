import axios from 'axios';
import { ConfigService } from '@nestjs/config';
import ApiError from '../../../../libs/common/res/api.error';
import ApiCodes from '../../../../libs/common/res/api.codes';
import ApiMessages from '../../../../libs/common/res/api.messages';
import { Injectable } from '@nestjs/common';

@Injectable()
export class NaverMapService {
    constructor(private readonly env: ConfigService) {}

    async getCoordinates(
        address: string,
    ): Promise<{ latitude: number; longitude: number }> {
        const url = this.env.get<string>('NAVER_MAP_URL');
        const headers = {
            'X-NCP-APIGW-API-KEY-ID': this.env.get<string>(
                'NAVER_MAP_APIKEY_ID',
            ),
            'X-NCP-APIGW-API-KEY': this.env.get<string>('NAVER_MAP_APIKEY'),
        };

        const params = { query: address };
        const response = await axios.get(url, { headers, params });

        if (response.data?.addresses?.length > 0) {
            const latitude = parseFloat(response.data.addresses[0].y);
            const longitude = parseFloat(response.data.addresses[0].x);
            return { latitude, longitude };
        }

        throw new ApiError(ApiCodes.BAD_REQUEST, ApiMessages.BAD_REQUEST, {
            message: 'Bad Address',
        });
    }
}
