import {
    IAuthenticateGeneric,
    ICredentialTestRequest,
    ICredentialType,
    INodeProperties,
} from 'n8n-workflow';

export class ChateryApi implements ICredentialType {
    name = 'chateryApi';
    displayName = 'Chatery API';
    documentationUrl = 'https://github.com/farinchan/chatery_backend';
    icon = 'file:chatery.svg' as const;
    properties: INodeProperties[] = [
        {
            displayName: 'Host URL',
            name: 'url',
            type: 'string',
            default: 'http://localhost:3000',
            placeholder: 'http://localhost:3000',
            description: 'The base URL of your Chatery API server',
        },
        {
            displayName: 'API Key',
            name: 'apiKey',
            type: 'string',
            typeOptions: { password: true },
            default: '',
            required: false,
            description: 'Optional API key for authentication (if configured)',
        },
    ];

    authenticate: IAuthenticateGeneric = {
        type: 'generic',
        properties: {
            headers: {
                'X-Api-Key': '={{$credentials.apiKey}}',
            },
        },
    };

    test: ICredentialTestRequest = {
        request: {
            baseURL: '={{$credentials.url}}',
            url: '/api/health',
        },
    };
}