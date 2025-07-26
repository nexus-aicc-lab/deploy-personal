// // src/features/auth/api/apiForGetSalt.ts

// import axiosInstance from "@/lib/axios";

// export interface GetSaltRequest {
//     cubetoken: {
//         agent: string;
//     };
// }

// export interface GetSaltResponse {
//     result: {
//         cube_token: string;
//         error_code: number;
//         error_message: string;
//     };
// }

// /**
//  * Salt 토큰을 요청하는 API
//  * @param agent - 에이전트 ID
//  * @returns Salt 토큰 응답
//  */
// export async function apiForGetSalt(agent: string): Promise<GetSaltResponse> {
//     try {
//         console.log('[API] Requesting salt for agent:', agent);

//         const requestBody: GetSaltRequest = {
//             cubetoken: {
//                 agent
//             }
//         };

//         // axios baseURL이 '/api'이므로 '/auth/salt'로 요청
//         const response = await axiosInstance.post<GetSaltResponse>('/auth/salt', requestBody);

//         console.log('[API] Salt response:', response.data);
//         return response.data;
//     } catch (error) {
//         console.error('[API] Error getting salt:', error);
//         throw error;
//     }
// }

// /**
//  * 회원가입 시 새로운 salt 생성을 요청하는 API (필요한 경우)
//  * @returns 새로 생성된 salt 값
//  */
// export async function apiForGenerateSalt(): Promise<GetSaltResponse> {
//     try {
//         console.log('[API] Requesting new salt generation');

//         const response = await axiosInstance.get<GetSaltResponse>('/auth/salt/generate');

//         console.log('[API] New salt generated:', response.data);
//         return response.data;
//     } catch (error) {
//         console.error('[API] Error generating salt:', error);
//         throw error;
//     }
// }

// src/features/auth/api/apiForGetSalt.ts

import axiosInstance from "@/lib/axios";

export interface GetSaltRequest {
    cubetoken: {
        agent: string;  // 
    };
}

// 응답 예시
// {
//     "result": {
//         "cube_token": "53dd2e2e-78806191-df98802b-8838c9b6",
//         "error_code": 0,
//         "error_message": ""
//     }
// }

export interface GetSaltResponse {
    result: {
        cube_token: string;
        error_code: number;
        error_message: string;
    };
}

// 현재 apiForGetSalt 함수 (이미 수정됨)
export async function apiForGetSalt(agent: string): Promise<GetSaltResponse> {
    // const requestBody: GetSaltRequest = {
    //     cubetoken: {
    //         agent
    //     }
    // };

    // const response = await axiosInstance.post<GetSaltResponse>('/cubetoken', requestBody);
    // return response.data;

    try {
        console.log('[API] Requesting salt for agent:', agent);

        const response = await axiosInstance.post<GetSaltResponse>('/cubetoken', {
            cubetoken: { agent }
        });

        console.log('[API] Salt response:', response.data);
        return response.data;
    }
    catch (error) {
        console.error('[API] Error getting salt:', error);
        throw error;
    }
}

/**
 * 회원가입 시 새로운 salt 생성을 요청하는 API (필요한 경우)
 * @returns 새로 생성된 salt 값
 */
export async function apiForGenerateSalt(): Promise<GetSaltResponse> {
    try {
        console.log('[API] Requesting new salt generation');

        const response = await axiosInstance.get<GetSaltResponse>('/salt/generate');

        console.log('[API] New salt generated:', response.data);
        return response.data;
    } catch (error) {
        console.error('[API] Error generating salt:', error);
        throw error;
    }
}