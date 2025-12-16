import {
	IDataObject,
	INodeType,
	INodeTypeDescription,
	IWebhookFunctions,
	IWebhookResponseData,
} from 'n8n-workflow';

export class ChateryWhatsAppTrigger implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Chatery WhatsApp Trigger',
		name: 'chateryWhatsAppTrigger',
		icon: 'file:chatery.svg',
		group: ['trigger'],
		version: 1,
		subtitle: '={{$parameter["event"]}}',
		description: 'Triggers workflow when WhatsApp events occur via Chatery webhook',
		defaults: {
			name: 'Chatery WhatsApp Trigger',
		},
		usableAsTool: true,
		inputs: [],
		outputs: ['main'],
		credentials: [
			{
				name: 'chateryApi',
				required: false,
			},
		],
		webhooks: [
			{
				name: 'default',
				httpMethod: 'POST',
				responseMode: 'onReceived',
				path: 'webhook',
			},
		],
		properties: [
			{
				displayName: 'Event',
				name: 'event',
				type: 'options',
				noDataExpression: true,
				options: [
					{
						name: 'All Events',
						value: 'all',
						description: 'Trigger on all events',
					},
					{
						name: 'Disconnected',
						value: 'disconnected',
						description: 'Trigger when WhatsApp client is disconnected',
					},
					{
						name: 'Group Participants Update',
						value: 'group_participants',
						description: 'Trigger when group participants change (join, leave, promote, demote)',
					},
					{
						name: 'Group Update',
						value: 'group_update',
						description: 'Trigger when group info is updated (name, description, picture)',
					},
					{
						name: 'Message',
						value: 'message',
						description: 'Trigger when a new message is received',
					},
					{
						name: 'Message Acknowledgement',
						value: 'message_ack',
						description: 'Trigger when message status changes (sent, delivered, read)',
					},
					{
						name: 'Message Revoke',
						value: 'message_revoke',
						description: 'Trigger when a message is deleted/revoked',
					},
					{
						name: 'Presence Update',
						value: 'presence',
						description: 'Trigger when user presence changes (online, offline, typing)',
					},
					{
						name: 'QR Code',
						value: 'qr',
						description: 'Trigger when QR code is generated for authentication',
					},
					{
						name: 'Ready',
						value: 'ready',
						description: 'Trigger when WhatsApp client is ready and authenticated',
					},
				],
				default: 'message',
				required: true,
				description: 'The event to listen for',
			},
			{
				displayName: 'Options',
				name: 'options',
				type: 'collection',
				placeholder: 'Add Option',
				default: {},
				options: [
					{
						displayName: 'Filter by Chat ID',
						name: 'chatIdFilter',
						type: 'string',
						default: '',
						description: 'Only trigger for events from this specific chat ID (e.g., 6281234567890@c.us)',
					},
					{
						displayName: 'Filter by Session',
						name: 'sessionFilter',
						type: 'string',
						default: '',
						description: 'Only trigger for events from this specific session ID',
					},
					{
						displayName: 'Ignore Status Messages',
						name: 'ignoreStatus',
						type: 'boolean',
						default: true,
						description: 'Whether to ignore status/story messages',
						displayOptions: {
							show: {
								'/event': ['message', 'all'],
							},
						},
					},
					{
						displayName: 'Only From Me',
						name: 'onlyFromMe',
						type: 'boolean',
						default: false,
						description: 'Whether to only trigger for messages sent by you',
						displayOptions: {
							show: {
								'/event': ['message', 'message_ack', 'all'],
							},
						},
					},
					{
						displayName: 'Only From Others',
						name: 'onlyFromOthers',
						type: 'boolean',
						default: false,
						description: 'Whether to only trigger for messages from others (not from you)',
						displayOptions: {
							show: {
								'/event': ['message', 'all'],
							},
						},
					},
				],
			},
		],
	};

	async webhook(this: IWebhookFunctions): Promise<IWebhookResponseData> {
		const bodyData = this.getBodyData() as IDataObject;
		const event = this.getNodeParameter('event') as string;
		const options = this.getNodeParameter('options', {}) as IDataObject;

		// Get the event type from the webhook payload
		const incomingEvent = (bodyData.event as string) || '';

		// Check if this event should trigger the workflow
		if (event !== 'all' && incomingEvent !== event) {
			// Event doesn't match, don't trigger
			return {
				webhookResponse: { received: true, processed: false },
			};
		}

		// Apply filters
		const sessionFilter = options.sessionFilter as string;
		const chatIdFilter = options.chatIdFilter as string;
		const ignoreStatus = options.ignoreStatus as boolean;
		const onlyFromMe = options.onlyFromMe as boolean;
		const onlyFromOthers = options.onlyFromOthers as boolean;

		const payload = (bodyData.payload || bodyData.data || bodyData) as IDataObject;
		const session = (bodyData.session || payload.session || '') as string;

		// Session filter
		if (sessionFilter && session !== sessionFilter) {
			return {
				webhookResponse: { received: true, processed: false },
			};
		}

		// Chat ID filter
		if (chatIdFilter) {
			const chat = payload.chat as IDataObject | undefined;
			const chatId = (payload.from || payload.chatId || chat?.id || '') as string;
			if (chatId !== chatIdFilter) {
				return {
					webhookResponse: { received: true, processed: false },
				};
			}
		}

		// Message-specific filters
		if (incomingEvent === 'message' || event === 'all') {
			// Ignore status messages
			if (ignoreStatus) {
				const fromStr = (payload.from || '') as string;
				const isStatus = payload.isStatus === true || fromStr.includes('status@broadcast');
				if (isStatus) {
					return {
						webhookResponse: { received: true, processed: false },
					};
				}
			}

			// Only from me filter
			if (onlyFromMe) {
				const fromMe = payload.fromMe as boolean;
				if (!fromMe) {
					return {
						webhookResponse: { received: true, processed: false },
					};
				}
			}

			// Only from others filter
			if (onlyFromOthers) {
				const fromMe = payload.fromMe as boolean;
				if (fromMe) {
					return {
						webhookResponse: { received: true, processed: false },
					};
				}
			}
		}

		// Return the webhook data
		return {
			workflowData: [
				this.helpers.returnJsonArray({
					event: incomingEvent,
					session,
					timestamp: new Date().toISOString(),
					...bodyData,
				}),
			],
		};
	}
}
