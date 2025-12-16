import {
	IDataObject,
	IExecuteFunctions,
	INodeExecutionData,
	INodeType,
	INodeTypeDescription,
	IHttpRequestMethods,
	IHttpRequestOptions,
	NodeApiError,
	JsonObject,
} from 'n8n-workflow';

export class ChateryWhatsApp implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Chatery WhatsApp',
		name: 'chateryWhatsApp',
		icon: 'file:chatery.svg',
		group: ['transform'],
		version: 1,
		subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
		description: 'Interact with WhatsApp via Chatery API',
		defaults: {
			name: 'Chatery WhatsApp',
		},
		usableAsTool: true,
		inputs: ['main'],
		outputs: ['main'],
		credentials: [
			{
				name: 'chateryApi',
				required: true,
			},
		],
		properties: [
			// Resource
			{
				displayName: 'Resource',
				name: 'resource',
				type: 'options',
				noDataExpression: true,
				options: [
					{
						name: 'Chat',
						value: 'chat',
					},
					{
						name: 'Group',
						value: 'group',
					},
					{
						name: 'History',
						value: 'history',
					},
					{
						name: 'Session',
						value: 'session',
					},
				],
				default: 'chat',
			},
			// Operations for Session
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: ['session'],
					},
				},
				options: [
					{
						name: 'Add Webhook',
						value: 'addWebhook',
						description: 'Add a webhook to a session',
						action: 'Add a webhook to a session',
					},
					{
						name: 'Connect',
						value: 'connect',
						description: 'Connect/create a WhatsApp session',
						action: 'Connect a whats app session',
					},
					{
						name: 'Delete',
						value: 'delete',
						description: 'Delete a WhatsApp session',
						action: 'Delete a whats app session',
					},
					{
						name: 'Get QR Code',
						value: 'qrCode',
						description: 'Get QR code data for authentication',
						action: 'Get QR code for authentication',
					},
					{
						name: 'Get QR Image',
						value: 'qrImage',
						description: 'Get QR code as image URL',
						action: 'Get QR code as image',
					},
					{
						name: 'Get Status',
						value: 'status',
						description: 'Get session status',
						action: 'Get session status',
					},
					{
						name: 'List',
						value: 'list',
						description: 'List all WhatsApp sessions',
						action: 'List all whats app sessions',
					},
					{
						name: 'Remove Webhook',
						value: 'removeWebhook',
						description: 'Remove a webhook from a session',
						action: 'Remove a webhook from a session',
					},
					{
						name: 'Update Config',
						value: 'updateConfig',
						description: 'Update session configuration',
						action: 'Update session configuration',
					},
				],
				default: 'list',
			},
			// Operations for History
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: ['history'],
					},
				},
				options: [
					{
						name: 'Get Chat Info',
						value: 'info',
						description: 'Get information about a chat',
						action: 'Get information about a chat',
					},
					{
						name: 'Get Contacts',
						value: 'contacts',
						description: 'Get list of contacts',
						action: 'Get list of contacts',
					},
					{
						name: 'Get Messages',
						value: 'messages',
						description: 'Get messages from a chat',
						action: 'Get messages from a chat',
					},
					{
						name: 'Get Overview',
						value: 'overview',
						description: 'Get overview of chats',
						action: 'Get overview of chats',
					},
					{
						name: 'Mark as Read',
						value: 'markRead',
						description: 'Mark a chat as read',
						action: 'Mark a chat as read',
					},
				],
				default: 'overview',
			},
			// Operations for Group
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: ['group'],
					},
				},
				options: [
					{
						name: 'Add Participants',
						value: 'addParticipants',
						description: 'Add participants to a group',
						action: 'Add participants to a group',
					},
					{
						name: 'Create',
						value: 'create',
						description: 'Create a new group',
						action: 'Create a new group',
					},
					{
						name: 'Demote Participants',
						value: 'demoteParticipants',
						description: 'Demote participants from admin',
						action: 'Demote participants from admin',
					},
					{
						name: 'Get Invite Code',
						value: 'getInviteCode',
						description: 'Get invite code for a group',
						action: 'Get invite code for a group',
					},
					{
						name: 'Get Metadata',
						value: 'metadata',
						description: 'Get group metadata',
						action: 'Get group metadata',
					},
					{
						name: 'Join',
						value: 'join',
						description: 'Join a group using invite code',
						action: 'Join a group using invite code',
					},
					{
						name: 'Leave',
						value: 'leave',
						description: 'Leave a group',
						action: 'Leave a group',
					},
					{
						name: 'List',
						value: 'list',
						description: 'List all groups',
						action: 'List all groups',
					},
					{
						name: 'Promote Participants',
						value: 'promoteParticipants',
						description: 'Promote participants to admin',
						action: 'Promote participants to admin',
					},
					{
						name: 'Remove Participants',
						value: 'removeParticipants',
						description: 'Remove participants from a group',
						action: 'Remove participants from a group',
					},
					{
						name: 'Revoke Invite',
						value: 'revokeInvite',
						description: 'Revoke invite code for a group',
						action: 'Revoke invite code for a group',
					},
					{
						name: 'Update Description',
						value: 'updateDescription',
						description: 'Update group description',
						action: 'Update group description',
					},
					{
						name: 'Update Picture',
						value: 'updatePicture',
						description: 'Update group picture',
						action: 'Update group picture',
					},
					{
						name: 'Update Settings',
						value: 'updateSettings',
						description: 'Update group settings',
						action: 'Update group settings',
					},
					{
						name: 'Update Subject',
						value: 'updateSubject',
						description: 'Update group subject/name',
						action: 'Update group subject name',
					},
				],
				default: 'list',
			},
			// Operations for Chat
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: ['chat'],
					},
				},
				options: [
					{
						name: 'Check Number',
						value: 'checkNumber',
						description: 'Check if a phone number is registered on WhatsApp',
						action: 'Check if a phone number is registered on whats app',
					},
					{
						name: 'Get Contact Info',
						value: 'contactInfo',
						description: 'Get contact information',
						action: 'Get contact information',
					},
					{
						name: 'Get Profile Picture',
						value: 'profilePicture',
						description: 'Get profile picture URL of a contact',
						action: 'Get profile picture URL of a contact',
					},
					{
						name: 'Send Button',
						value: 'sendButton',
						description: 'Send a message with buttons',
						action: 'Send a message with buttons',
					},
					{
						name: 'Send Contact',
						value: 'sendContact',
						description: 'Send a contact card',
						action: 'Send a contact card',
					},
					{
						name: 'Send Document',
						value: 'sendDocument',
						description: 'Send a document file',
						action: 'Send a document file',
					},
					{
						name: 'Send Image',
						value: 'sendImage',
						description: 'Send an image',
						action: 'Send an image',
					},
					{
						name: 'Send Location',
						value: 'sendLocation',
						description: 'Send a location',
						action: 'Send a location',
					},
					{
						name: 'Send Presence Update',
						value: 'sendPresenceUpdate',
						description: 'Send presence update (typing, recording, etc.)',
						action: 'Send presence update',
					},
					{
						name: 'Send Text',
						value: 'sendText',
						description: 'Send a text message',
						action: 'Send a text message',
					},
				],
				default: 'sendText',
			},

			// ==========================================
			// Common Fields
			// ==========================================
			{
				displayName: 'Session ID',
				name: 'sessionId',
				type: 'string',
				required: true,
				default: '',
				description: 'The WhatsApp session ID',
				displayOptions: {
					show: {
						resource: ['chat'],
					},
				},
			},
			{
				displayName: 'Session ID',
				name: 'sessionId',
				type: 'string',
				required: true,
				default: '',
				description: 'The WhatsApp session ID',
				displayOptions: {
					show: {
						resource: ['session'],
						operation: ['connect', 'status', 'updateConfig', 'addWebhook', 'removeWebhook', 'qrCode', 'qrImage', 'delete'],
					},
				},
			},
			{
				displayName: 'Session ID',
				name: 'sessionId',
				type: 'string',
				required: true,
				default: '',
				description: 'The WhatsApp session ID',
				displayOptions: {
					show: {
						resource: ['history'],
					},
				},
			},
			{
				displayName: 'Session ID',
				name: 'sessionId',
				type: 'string',
				required: true,
				default: '',
				description: 'The WhatsApp session ID',
				displayOptions: {
					show: {
						resource: ['group'],
					},
				},
			},

			// ==========================================
			// Send Text Fields
			// ==========================================
			{
				displayName: 'Chat ID',
				name: 'chatId',
				type: 'string',
				required: true,
				default: '',
				placeholder: '6281234567890@c.us',
				description: 'The chat ID to send the message to (e.g., 6281234567890@c.us for personal, 123456789@g.us for group)',
				displayOptions: {
					show: {
						resource: ['chat'],
						operation: ['sendText', 'sendImage', 'sendDocument', 'sendLocation', 'sendContact', 'sendButton', 'sendPresenceUpdate'],
					},
				},
			},
			{
				displayName: 'Message',
				name: 'message',
				type: 'string',
				typeOptions: {
					rows: 4,
				},
				required: true,
				default: '',
				description: 'The text message to send',
				displayOptions: {
					show: {
						resource: ['chat'],
						operation: ['sendText'],
					},
				},
			},

			// ==========================================
			// Send Image Fields
			// ==========================================
			{
				displayName: 'Image URL',
				name: 'imageUrl',
				type: 'string',
				required: true,
				default: '',
				placeholder: 'https://example.com/image.jpg',
				description: 'The URL of the image to send',
				displayOptions: {
					show: {
						resource: ['chat'],
						operation: ['sendImage'],
					},
				},
			},
			{
				displayName: 'Caption',
				name: 'caption',
				type: 'string',
				default: '',
				description: 'Optional caption for the image',
				displayOptions: {
					show: {
						resource: ['chat'],
						operation: ['sendImage'],
					},
				},
			},

			// ==========================================
			// Send Document Fields
			// ==========================================
			{
				displayName: 'Document URL',
				name: 'documentUrl',
				type: 'string',
				required: true,
				default: '',
				placeholder: 'https://example.com/document.pdf',
				description: 'The URL of the document to send',
				displayOptions: {
					show: {
						resource: ['chat'],
						operation: ['sendDocument'],
					},
				},
			},
			{
				displayName: 'Filename',
				name: 'filename',
				type: 'string',
				required: true,
				default: '',
				placeholder: 'document.pdf',
				description: 'The filename to display for the document',
				displayOptions: {
					show: {
						resource: ['chat'],
						operation: ['sendDocument'],
					},
				},
			},
			{
				displayName: 'MIME Type',
				name: 'mimetype',
				type: 'string',
				default: '',
				placeholder: 'application/pdf',
				description: 'The MIME type of the document (optional)',
				displayOptions: {
					show: {
						resource: ['chat'],
						operation: ['sendDocument'],
					},
				},
			},

			// ==========================================
			// Send Location Fields
			// ==========================================
			{
				displayName: 'Latitude',
				name: 'latitude',
				type: 'number',
				typeOptions: {
					numberPrecision: 6,
				},
				required: true,
				default: 0,
				description: 'The latitude of the location',
				displayOptions: {
					show: {
						resource: ['chat'],
						operation: ['sendLocation'],
					},
				},
			},
			{
				displayName: 'Longitude',
				name: 'longitude',
				type: 'number',
				typeOptions: {
					numberPrecision: 6,
				},
				required: true,
				default: 0,
				description: 'The longitude of the location',
				displayOptions: {
					show: {
						resource: ['chat'],
						operation: ['sendLocation'],
					},
				},
			},
			{
				displayName: 'Location Name',
				name: 'locationName',
				type: 'string',
				default: '',
				description: 'Optional name for the location',
				displayOptions: {
					show: {
						resource: ['chat'],
						operation: ['sendLocation'],
					},
				},
			},

			// ==========================================
			// Send Contact Fields
			// ==========================================
			{
				displayName: 'Contact Name',
				name: 'contactName',
				type: 'string',
				required: true,
				default: '',
				description: 'The name of the contact to send',
				displayOptions: {
					show: {
						resource: ['chat'],
						operation: ['sendContact'],
					},
				},
			},
			{
				displayName: 'Contact Phone',
				name: 'contactPhone',
				type: 'string',
				required: true,
				default: '',
				placeholder: '6281234567890',
				description: 'The phone number of the contact',
				displayOptions: {
					show: {
						resource: ['chat'],
						operation: ['sendContact'],
					},
				},
			},

			// ==========================================
			// Send Button Fields
			// ==========================================
			{
				displayName: 'Text',
				name: 'buttonText',
				type: 'string',
				typeOptions: {
					rows: 3,
				},
				required: true,
				default: '',
				description: 'The main text of the button message',
				displayOptions: {
					show: {
						resource: ['chat'],
						operation: ['sendButton'],
					},
				},
			},
			{
				displayName: 'Footer',
				name: 'footer',
				type: 'string',
				default: '',
				description: 'Optional footer text',
				displayOptions: {
					show: {
						resource: ['chat'],
						operation: ['sendButton'],
					},
				},
			},
			{
				displayName: 'Buttons',
				name: 'buttons',
				type: 'fixedCollection',
				typeOptions: {
					multipleValues: true,
				},
				default: {},
				placeholder: 'Add Button',
				description: 'The buttons to include in the message',
				displayOptions: {
					show: {
						resource: ['chat'],
						operation: ['sendButton'],
					},
				},
				options: [
					{
						name: 'buttonValues',
						displayName: 'Button',
						values: [
							{
								displayName: 'Button ID',
								name: 'id',
								type: 'string',
								default: '',
								description: 'Unique identifier for the button',
							},
							{
								displayName: 'Button Text',
								name: 'text',
								type: 'string',
								default: '',
								description: 'The text displayed on the button',
							},
						],
					},
				],
			},

			// ==========================================
			// Send Presence Update Fields
			// ==========================================
			{
				displayName: 'Presence',
				name: 'presence',
				type: 'options',
				required: true,
				options: [
					{
						name: 'Available',
						value: 'available',
					},
					{
						name: 'Composing',
						value: 'composing',
					},
					{
						name: 'Paused',
						value: 'paused',
					},
					{
						name: 'Recording',
						value: 'recording',
					},
					{
						name: 'Unavailable',
						value: 'unavailable',
					},
				],
				default: 'composing',
				description: 'The presence status to send',
				displayOptions: {
					show: {
						resource: ['chat'],
						operation: ['sendPresenceUpdate'],
					},
				},
			},

			// ==========================================
			// Check Number / Profile Picture / Contact Info Fields
			// ==========================================
			{
				displayName: 'Phone Number',
				name: 'phone',
				type: 'string',
				required: true,
				default: '',
				placeholder: '6281234567890',
				description: 'The phone number to check (without + or spaces)',
				displayOptions: {
					show: {
						resource: ['chat'],
						operation: ['checkNumber', 'profilePicture', 'contactInfo'],
					},
				},
			},

			// ==========================================
			// Common Optional Fields
			// ==========================================
			{
				displayName: 'Typing Time',
				name: 'typingTime',
				type: 'number',
				default: 0,
				description: 'Time in milliseconds to simulate typing before sending (0 = no typing simulation)',
				displayOptions: {
					show: {
						resource: ['chat'],
						operation: ['sendText', 'sendImage', 'sendDocument', 'sendLocation', 'sendContact', 'sendButton'],
					},
				},
			},

			// ==========================================
			// Session: Connect Fields
			// ==========================================
			{
				displayName: 'Metadata',
				name: 'metadata',
				type: 'json',
				default: '{}',
				description: 'Optional metadata for the session (JSON format)',
				displayOptions: {
					show: {
						resource: ['session'],
						operation: ['connect', 'updateConfig'],
					},
				},
			},
			{
				displayName: 'Webhooks',
				name: 'webhooks',
				type: 'fixedCollection',
				typeOptions: {
					multipleValues: true,
				},
				default: {},
				placeholder: 'Add Webhook',
				description: 'Webhooks to register for the session',
				displayOptions: {
					show: {
						resource: ['session'],
						operation: ['connect', 'updateConfig'],
					},
				},
				options: [
					{
						name: 'webhookValues',
						displayName: 'Webhook',
						values: [
							{
								displayName: 'URL',
								name: 'url',
								type: 'string',
								default: '',
								placeholder: 'https://example.com/webhook',
								description: 'The webhook URL',
							},
							{
								displayName: 'Events',
								name: 'events',
								type: 'multiOptions',
								options: [
									{ name: 'Disconnected', value: 'disconnected' },
									{ name: 'Group Participants', value: 'group_participants' },
									{ name: 'Group Update', value: 'group_update' },
									{ name: 'Message', value: 'message' },
									{ name: 'Message Ack', value: 'message_ack' },
									{ name: 'Message Revoke', value: 'message_revoke' },
									{ name: 'Presence', value: 'presence' },
									{ name: 'QR', value: 'qr' },
									{ name: 'Ready', value: 'ready' },
								],
								default: [],
								description: 'Events to subscribe to (leave empty for all events)',
							},
						],
					},
				],
			},

			// ==========================================
			// Session: Add/Remove Webhook Fields
			// ==========================================
			{
				displayName: 'Webhook URL',
				name: 'webhookUrl',
				type: 'string',
				required: true,
				default: '',
				placeholder: 'https://example.com/webhook',
				description: 'The webhook URL to add or remove',
				displayOptions: {
					show: {
						resource: ['session'],
						operation: ['addWebhook', 'removeWebhook'],
					},
				},
			},
			{
				displayName: 'Events',
				name: 'webhookEvents',
				type: 'multiOptions',
				options: [
					{ name: 'Disconnected', value: 'disconnected' },
					{ name: 'Group Participants', value: 'group_participants' },
					{ name: 'Group Update', value: 'group_update' },
					{ name: 'Message', value: 'message' },
					{ name: 'Message Ack', value: 'message_ack' },
					{ name: 'Message Revoke', value: 'message_revoke' },
					{ name: 'Presence', value: 'presence' },
					{ name: 'QR', value: 'qr' },
					{ name: 'Ready', value: 'ready' },
				],
				default: [],
				description: 'Events to subscribe to (leave empty for all events)',
				displayOptions: {
					show: {
						resource: ['session'],
						operation: ['addWebhook'],
					},
				},
			},

			// ==========================================
			// History: Overview Fields
			// ==========================================
			{
				displayName: 'Limit',
				name: 'limit',
				type: 'number',
				typeOptions: {
					minValue: 1,
				},
				default: 50,
				description: 'Max number of results to return',
				displayOptions: {
					show: {
						resource: ['history'],
						operation: ['overview', 'contacts', 'messages'],
					},
				},
			},
			{
				displayName: 'Offset',
				name: 'offset',
				type: 'number',
				default: 0,
				description: 'Number of results to skip',
				displayOptions: {
					show: {
						resource: ['history'],
						operation: ['overview', 'contacts'],
					},
				},
			},
			{
				displayName: 'Type',
				name: 'chatType',
				type: 'options',
				options: [
					{ name: 'All', value: '' },
					{ name: 'Group', value: 'group' },
					{ name: 'Private', value: 'private' },
				],
				default: '',
				description: 'Filter by chat type',
				displayOptions: {
					show: {
						resource: ['history'],
						operation: ['overview'],
					},
				},
			},
			{
				displayName: 'Search',
				name: 'search',
				type: 'string',
				default: '',
				description: 'Search term to filter contacts',
				displayOptions: {
					show: {
						resource: ['history'],
						operation: ['contacts'],
					},
				},
			},
			{
				displayName: 'Chat ID',
				name: 'chatId',
				type: 'string',
				required: true,
				default: '',
				placeholder: '6281234567890@c.us',
				description: 'The chat ID to get messages from',
				displayOptions: {
					show: {
						resource: ['history'],
						operation: ['messages', 'info', 'markRead'],
					},
				},
			},
			{
				displayName: 'Cursor',
				name: 'cursor',
				type: 'string',
				default: '',
				description: 'Cursor for pagination (message ID to start from)',
				displayOptions: {
					show: {
						resource: ['history'],
						operation: ['messages'],
					},
				},
			},
			{
				displayName: 'Message ID',
				name: 'messageId',
				type: 'string',
				default: '',
				description: 'Optional message ID to mark as read up to',
				displayOptions: {
					show: {
						resource: ['history'],
						operation: ['markRead'],
					},
				},
			},

			// ==========================================
			// Group Fields
			// ==========================================
			{
				displayName: 'Group ID',
				name: 'groupId',
				type: 'string',
				required: true,
				default: '',
				placeholder: '123456789012345678@g.us',

				displayOptions: {
					show: {
						resource: ['group'],
						operation: ['metadata', 'addParticipants', 'removeParticipants', 'promoteParticipants', 'demoteParticipants', 'updateSubject', 'updateDescription', 'updateSettings', 'updatePicture', 'leave', 'getInviteCode', 'revokeInvite'],
					},
				},
			},
			{
				displayName: 'Group Name',
				name: 'groupName',
				type: 'string',
				required: true,
				default: '',
				description: 'The name of the group to create',
				displayOptions: {
					show: {
						resource: ['group'],
						operation: ['create'],
					},
				},
			},
			{
				displayName: 'Participants',
				name: 'participants',
				type: 'string',
				required: true,
				default: '',
				placeholder: '6281234567890,6281234567891',
				description: 'Comma-separated list of phone numbers to add as participants',
				displayOptions: {
					show: {
						resource: ['group'],
						operation: ['create', 'addParticipants', 'removeParticipants', 'promoteParticipants', 'demoteParticipants'],
					},
				},
			},
			{
				displayName: 'Subject',
				name: 'subject',
				type: 'string',
				required: true,
				default: '',
				description: 'The new subject/name for the group',
				displayOptions: {
					show: {
						resource: ['group'],
						operation: ['updateSubject'],
					},
				},
			},
			{
				displayName: 'Description',
				name: 'description',
				type: 'string',
				typeOptions: {
					rows: 3,
				},
				required: true,
				default: '',
				description: 'The new description for the group',
				displayOptions: {
					show: {
						resource: ['group'],
						operation: ['updateDescription'],
					},
				},
			},
			{
				displayName: 'Setting',
				name: 'setting',
				type: 'options',
				options: [
					{ name: 'Announcement (Admins Only)', value: 'announcement' },
					{ name: 'Not Announcement (All Members)', value: 'not_announcement' },
					{ name: 'Locked (Admins Edit Info)', value: 'locked' },
					{ name: 'Unlocked (All Edit Info)', value: 'unlocked' },
				],
				required: true,
				default: 'announcement',
				description: 'The group setting to update',
				displayOptions: {
					show: {
						resource: ['group'],
						operation: ['updateSettings'],
					},
				},
			},
			{
				displayName: 'Image URL',
				name: 'groupImageUrl',
				type: 'string',
				required: true,
				default: '',
				placeholder: 'https://example.com/image.jpg',
				description: 'The URL of the image to set as group picture',
				displayOptions: {
					show: {
						resource: ['group'],
						operation: ['updatePicture'],
					},
				},
			},
			{
				displayName: 'Invite Code',
				name: 'inviteCode',
				type: 'string',
				required: true,
				default: '',
				placeholder: 'AbCdEfGhIjK',
				description: 'The invite code to join a group',
				displayOptions: {
					show: {
						resource: ['group'],
						operation: ['join'],
					},
				},
			},
		],
	};

	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		const items = this.getInputData();
		const returnData: INodeExecutionData[] = [];
		const credentials = await this.getCredentials('chateryApi');

		const resource = this.getNodeParameter('resource', 0) as string;
		const operation = this.getNodeParameter('operation', 0) as string;

		for (let i = 0; i < items.length; i++) {
			try {
				let responseData: IDataObject;
				const sessionId = this.getNodeParameter('sessionId', i) as string;

				if (resource === 'chat') {
					if (operation === 'sendText') {
						const chatId = this.getNodeParameter('chatId', i) as string;
						const message = this.getNodeParameter('message', i) as string;
						const typingTime = this.getNodeParameter('typingTime', i) as number;

						const body: IDataObject = {
							sessionId,
							chatId,
							message,
						};
						if (typingTime > 0) {
							body.typingTime = typingTime;
						}

						responseData = await chateryApiRequest.call(this, 'POST', '/api/whatsapp/chats/send-text', body, credentials);
					} else if (operation === 'sendImage') {
						const chatId = this.getNodeParameter('chatId', i) as string;
						const imageUrl = this.getNodeParameter('imageUrl', i) as string;
						const caption = this.getNodeParameter('caption', i) as string;
						const typingTime = this.getNodeParameter('typingTime', i) as number;

						const body: IDataObject = {
							sessionId,
							chatId,
							imageUrl,
						};
						if (caption) {
							body.caption = caption;
						}
						if (typingTime > 0) {
							body.typingTime = typingTime;
						}

						responseData = await chateryApiRequest.call(this, 'POST', '/api/whatsapp/chats/send-image', body, credentials);
					} else if (operation === 'sendDocument') {
						const chatId = this.getNodeParameter('chatId', i) as string;
						const documentUrl = this.getNodeParameter('documentUrl', i) as string;
						const filename = this.getNodeParameter('filename', i) as string;
						const mimetype = this.getNodeParameter('mimetype', i) as string;
						const typingTime = this.getNodeParameter('typingTime', i) as number;

						const body: IDataObject = {
							sessionId,
							chatId,
							documentUrl,
							filename,
						};
						if (mimetype) {
							body.mimetype = mimetype;
						}
						if (typingTime > 0) {
							body.typingTime = typingTime;
						}

						responseData = await chateryApiRequest.call(this, 'POST', '/api/whatsapp/chats/send-document', body, credentials);
					} else if (operation === 'sendLocation') {
						const chatId = this.getNodeParameter('chatId', i) as string;
						const latitude = this.getNodeParameter('latitude', i) as number;
						const longitude = this.getNodeParameter('longitude', i) as number;
						const locationName = this.getNodeParameter('locationName', i) as string;
						const typingTime = this.getNodeParameter('typingTime', i) as number;

						const body: IDataObject = {
							sessionId,
							chatId,
							latitude,
							longitude,
						};
						if (locationName) {
							body.name = locationName;
						}
						if (typingTime > 0) {
							body.typingTime = typingTime;
						}

						responseData = await chateryApiRequest.call(this, 'POST', '/api/whatsapp/chats/send-location', body, credentials);
					} else if (operation === 'sendContact') {
						const chatId = this.getNodeParameter('chatId', i) as string;
						const contactName = this.getNodeParameter('contactName', i) as string;
						const contactPhone = this.getNodeParameter('contactPhone', i) as string;
						const typingTime = this.getNodeParameter('typingTime', i) as number;

						const body: IDataObject = {
							sessionId,
							chatId,
							contactName,
							contactPhone,
						};
						if (typingTime > 0) {
							body.typingTime = typingTime;
						}

						responseData = await chateryApiRequest.call(this, 'POST', '/api/whatsapp/chats/send-contact', body, credentials);
					} else if (operation === 'sendButton') {
						const chatId = this.getNodeParameter('chatId', i) as string;
						const text = this.getNodeParameter('buttonText', i) as string;
						const footer = this.getNodeParameter('footer', i) as string;
						const buttonsData = this.getNodeParameter('buttons', i) as IDataObject;
						const typingTime = this.getNodeParameter('typingTime', i) as number;

						const buttons: IDataObject[] = [];
						if (buttonsData.buttonValues) {
							const buttonValues = buttonsData.buttonValues as IDataObject[];
							for (const button of buttonValues) {
								buttons.push({
									id: button.id,
									text: button.text,
								});
							}
						}

						const body: IDataObject = {
							sessionId,
							chatId,
							text,
							buttons,
						};
						if (footer) {
							body.footer = footer;
						}
						if (typingTime > 0) {
							body.typingTime = typingTime;
						}

						responseData = await chateryApiRequest.call(this, 'POST', '/api/whatsapp/chats/send-button', body, credentials);
					} else if (operation === 'sendPresenceUpdate') {
						const chatId = this.getNodeParameter('chatId', i) as string;
						const presence = this.getNodeParameter('presence', i) as string;

						const body: IDataObject = {
							sessionId,
							chatId,
							presence,
						};

						responseData = await chateryApiRequest.call(this, 'POST', '/api/whatsapp/chats/presence', body, credentials);
					} else if (operation === 'checkNumber') {
						const phone = this.getNodeParameter('phone', i) as string;

						const body: IDataObject = {
							sessionId,
							phone,
						};

						responseData = await chateryApiRequest.call(this, 'POST', '/api/whatsapp/chats/check-number', body, credentials);
					} else if (operation === 'profilePicture') {
						const phone = this.getNodeParameter('phone', i) as string;

						const body: IDataObject = {
							sessionId,
							phone,
						};

						responseData = await chateryApiRequest.call(this, 'POST', '/api/whatsapp/chats/profile-picture', body, credentials);
					} else if (operation === 'contactInfo') {
						const phone = this.getNodeParameter('phone', i) as string;

						const body: IDataObject = {
							sessionId,
							phone,
						};

						responseData = await chateryApiRequest.call(this, 'POST', '/api/whatsapp/chats/contact-info', body, credentials);
					} else {
						throw new NodeApiError(this.getNode(), { message: `Unknown operation: ${operation}` });
					}
				} else if (resource === 'session') {
					let responseData: IDataObject;

					if (operation === 'list') {
						responseData = await chateryApiRequestGet.call(this, 'GET', '/api/whatsapp/sessions', credentials);
					} else if (operation === 'connect') {
						const sessionId = this.getNodeParameter('sessionId', i) as string;
						const metadataStr = this.getNodeParameter('metadata', i) as string;
						const webhooksData = this.getNodeParameter('webhooks', i) as IDataObject;

						const body: IDataObject = {};
						if (metadataStr && metadataStr !== '{}') {
							try {
								body.metadata = JSON.parse(metadataStr);
							} catch {
								body.metadata = {};
							}
						}
						if (webhooksData.webhookValues) {
							const webhookValues = webhooksData.webhookValues as IDataObject[];
							body.webhooks = webhookValues.map((wh) => ({
								url: wh.url,
								events: wh.events,
							}));
						}

						responseData = await chateryApiRequest.call(this, 'POST', `/api/whatsapp/sessions/${sessionId}/connect`, body, credentials);
					} else if (operation === 'status') {
						const sessionId = this.getNodeParameter('sessionId', i) as string;
						responseData = await chateryApiRequestGet.call(this, 'GET', `/api/whatsapp/sessions/${sessionId}/status`, credentials);
					} else if (operation === 'updateConfig') {
						const sessionId = this.getNodeParameter('sessionId', i) as string;
						const metadataStr = this.getNodeParameter('metadata', i) as string;
						const webhooksData = this.getNodeParameter('webhooks', i) as IDataObject;

						const body: IDataObject = {};
						if (metadataStr && metadataStr !== '{}') {
							try {
								body.metadata = JSON.parse(metadataStr);
							} catch {
								body.metadata = {};
							}
						}
						if (webhooksData.webhookValues) {
							const webhookValues = webhooksData.webhookValues as IDataObject[];
							body.webhooks = webhookValues.map((wh) => ({
								url: wh.url,
								events: wh.events,
							}));
						}

						responseData = await chateryApiRequestPatch.call(this, 'PATCH', `/api/whatsapp/sessions/${sessionId}/config`, body, credentials);
					} else if (operation === 'addWebhook') {
						const sessionId = this.getNodeParameter('sessionId', i) as string;
						const webhookUrl = this.getNodeParameter('webhookUrl', i) as string;
						const webhookEvents = this.getNodeParameter('webhookEvents', i) as string[];

						const body: IDataObject = {
							url: webhookUrl,
						};
						if (webhookEvents && webhookEvents.length > 0) {
							body.events = webhookEvents;
						}

						responseData = await chateryApiRequest.call(this, 'POST', `/api/whatsapp/sessions/${sessionId}/webhooks`, body, credentials);
					} else if (operation === 'removeWebhook') {
						const sessionId = this.getNodeParameter('sessionId', i) as string;
						const webhookUrl = this.getNodeParameter('webhookUrl', i) as string;

						const body: IDataObject = {
							url: webhookUrl,
						};

						responseData = await chateryApiRequestDelete.call(this, 'DELETE', `/api/whatsapp/sessions/${sessionId}/webhooks`, body, credentials);
					} else if (operation === 'qrCode') {
						const sessionId = this.getNodeParameter('sessionId', i) as string;
						responseData = await chateryApiRequestGet.call(this, 'GET', `/api/whatsapp/sessions/${sessionId}/qr`, credentials);
					} else if (operation === 'qrImage') {
						const sessionId = this.getNodeParameter('sessionId', i) as string;
						responseData = await chateryApiRequestGet.call(this, 'GET', `/api/whatsapp/sessions/${sessionId}/qr/image`, credentials);
					} else if (operation === 'delete') {
						const sessionId = this.getNodeParameter('sessionId', i) as string;
						responseData = await chateryApiRequestDelete.call(this, 'DELETE', `/api/whatsapp/sessions/${sessionId}`, {}, credentials);
					} else {
						throw new NodeApiError(this.getNode(), { message: `Unknown operation: ${operation}` });
					}

					const executionData = this.helpers.constructExecutionMetaData(
						this.helpers.returnJsonArray(responseData),
						{ itemData: { item: i } },
					);
					returnData.push(...executionData);
					continue;
				} else if (resource === 'history') {
					let responseData: IDataObject;
					const sessionId = this.getNodeParameter('sessionId', i) as string;

					if (operation === 'overview') {
						const limit = this.getNodeParameter('limit', i) as number;
						const offset = this.getNodeParameter('offset', i) as number;
						const chatType = this.getNodeParameter('chatType', i) as string;

						const body: IDataObject = { sessionId };
						if (limit) body.limit = limit;
						if (offset) body.offset = offset;
						if (chatType) body.type = chatType;

						responseData = await chateryApiRequest.call(this, 'POST', '/api/whatsapp/chats/overview', body, credentials);
					} else if (operation === 'contacts') {
						const limit = this.getNodeParameter('limit', i) as number;
						const offset = this.getNodeParameter('offset', i) as number;
						const search = this.getNodeParameter('search', i) as string;

						const body: IDataObject = { sessionId };
						if (limit) body.limit = limit;
						if (offset) body.offset = offset;
						if (search) body.search = search;

						responseData = await chateryApiRequest.call(this, 'POST', '/api/whatsapp/contacts', body, credentials);
					} else if (operation === 'messages') {
						const chatId = this.getNodeParameter('chatId', i) as string;
						const limit = this.getNodeParameter('limit', i) as number;
						const cursor = this.getNodeParameter('cursor', i) as string;

						const body: IDataObject = { sessionId, chatId };
						if (limit) body.limit = limit;
						if (cursor) body.cursor = cursor;

						responseData = await chateryApiRequest.call(this, 'POST', '/api/whatsapp/chats/messages', body, credentials);
					} else if (operation === 'info') {
						const chatId = this.getNodeParameter('chatId', i) as string;

						const body: IDataObject = { sessionId, chatId };

						responseData = await chateryApiRequest.call(this, 'POST', '/api/whatsapp/chats/info', body, credentials);
					} else if (operation === 'markRead') {
						const chatId = this.getNodeParameter('chatId', i) as string;
						const messageId = this.getNodeParameter('messageId', i) as string;

						const body: IDataObject = { sessionId, chatId };
						if (messageId) body.messageId = messageId;

						responseData = await chateryApiRequest.call(this, 'POST', '/api/whatsapp/chats/mark-read', body, credentials);
					} else {
						throw new NodeApiError(this.getNode(), { message: `Unknown operation: ${operation}` });
					}

					const executionData = this.helpers.constructExecutionMetaData(
						this.helpers.returnJsonArray(responseData),
						{ itemData: { item: i } },
					);
					returnData.push(...executionData);
					continue;
				} else if (resource === 'group') {
					let responseData: IDataObject;
					const sessionId = this.getNodeParameter('sessionId', i) as string;

					if (operation === 'list') {
						const body: IDataObject = { sessionId };
						responseData = await chateryApiRequest.call(this, 'POST', '/api/whatsapp/groups', body, credentials);
					} else if (operation === 'create') {
						const groupName = this.getNodeParameter('groupName', i) as string;
						const participantsStr = this.getNodeParameter('participants', i) as string;
						const participants = participantsStr.split(',').map((p) => p.trim()).filter((p) => p);

						const body: IDataObject = {
							sessionId,
							name: groupName,
							participants,
						};

						responseData = await chateryApiRequest.call(this, 'POST', '/api/whatsapp/groups/create', body, credentials);
					} else if (operation === 'metadata') {
						const groupId = this.getNodeParameter('groupId', i) as string;

						const body: IDataObject = { sessionId, groupId };

						responseData = await chateryApiRequest.call(this, 'POST', '/api/whatsapp/groups/metadata', body, credentials);
					} else if (operation === 'addParticipants') {
						const groupId = this.getNodeParameter('groupId', i) as string;
						const participantsStr = this.getNodeParameter('participants', i) as string;
						const participants = participantsStr.split(',').map((p) => p.trim()).filter((p) => p);

						const body: IDataObject = { sessionId, groupId, participants };

						responseData = await chateryApiRequest.call(this, 'POST', '/api/whatsapp/groups/participants/add', body, credentials);
					} else if (operation === 'removeParticipants') {
						const groupId = this.getNodeParameter('groupId', i) as string;
						const participantsStr = this.getNodeParameter('participants', i) as string;
						const participants = participantsStr.split(',').map((p) => p.trim()).filter((p) => p);

						const body: IDataObject = { sessionId, groupId, participants };

						responseData = await chateryApiRequest.call(this, 'POST', '/api/whatsapp/groups/participants/remove', body, credentials);
					} else if (operation === 'promoteParticipants') {
						const groupId = this.getNodeParameter('groupId', i) as string;
						const participantsStr = this.getNodeParameter('participants', i) as string;
						const participants = participantsStr.split(',').map((p) => p.trim()).filter((p) => p);

						const body: IDataObject = { sessionId, groupId, participants };

						responseData = await chateryApiRequest.call(this, 'POST', '/api/whatsapp/groups/participants/promote', body, credentials);
					} else if (operation === 'demoteParticipants') {
						const groupId = this.getNodeParameter('groupId', i) as string;
						const participantsStr = this.getNodeParameter('participants', i) as string;
						const participants = participantsStr.split(',').map((p) => p.trim()).filter((p) => p);

						const body: IDataObject = { sessionId, groupId, participants };

						responseData = await chateryApiRequest.call(this, 'POST', '/api/whatsapp/groups/participants/demote', body, credentials);
					} else if (operation === 'updateSubject') {
						const groupId = this.getNodeParameter('groupId', i) as string;
						const subject = this.getNodeParameter('subject', i) as string;

						const body: IDataObject = { sessionId, groupId, subject };

						responseData = await chateryApiRequest.call(this, 'POST', '/api/whatsapp/groups/subject', body, credentials);
					} else if (operation === 'updateDescription') {
						const groupId = this.getNodeParameter('groupId', i) as string;
						const description = this.getNodeParameter('description', i) as string;

						const body: IDataObject = { sessionId, groupId, description };

						responseData = await chateryApiRequest.call(this, 'POST', '/api/whatsapp/groups/description', body, credentials);
					} else if (operation === 'updateSettings') {
						const groupId = this.getNodeParameter('groupId', i) as string;
						const setting = this.getNodeParameter('setting', i) as string;

						const body: IDataObject = { sessionId, groupId, setting };

						responseData = await chateryApiRequest.call(this, 'POST', '/api/whatsapp/groups/settings', body, credentials);
					} else if (operation === 'updatePicture') {
						const groupId = this.getNodeParameter('groupId', i) as string;
						const imageUrl = this.getNodeParameter('groupImageUrl', i) as string;

						const body: IDataObject = { sessionId, groupId, imageUrl };

						responseData = await chateryApiRequest.call(this, 'POST', '/api/whatsapp/groups/picture', body, credentials);
					} else if (operation === 'leave') {
						const groupId = this.getNodeParameter('groupId', i) as string;

						const body: IDataObject = { sessionId, groupId };

						responseData = await chateryApiRequest.call(this, 'POST', '/api/whatsapp/groups/leave', body, credentials);
					} else if (operation === 'join') {
						const inviteCode = this.getNodeParameter('inviteCode', i) as string;

						const body: IDataObject = { sessionId, inviteCode };

						responseData = await chateryApiRequest.call(this, 'POST', '/api/whatsapp/groups/join', body, credentials);
					} else if (operation === 'getInviteCode') {
						const groupId = this.getNodeParameter('groupId', i) as string;

						const body: IDataObject = { sessionId, groupId };

						responseData = await chateryApiRequest.call(this, 'POST', '/api/whatsapp/groups/invite-code', body, credentials);
					} else if (operation === 'revokeInvite') {
						const groupId = this.getNodeParameter('groupId', i) as string;

						const body: IDataObject = { sessionId, groupId };

						responseData = await chateryApiRequest.call(this, 'POST', '/api/whatsapp/groups/revoke-invite', body, credentials);
					} else {
						throw new NodeApiError(this.getNode(), { message: `Unknown operation: ${operation}` });
					}

					const executionData = this.helpers.constructExecutionMetaData(
						this.helpers.returnJsonArray(responseData),
						{ itemData: { item: i } },
					);
					returnData.push(...executionData);
					continue;
				} else {
					throw new NodeApiError(this.getNode(), { message: `Unknown resource: ${resource}` });
				}

				const executionData = this.helpers.constructExecutionMetaData(
					this.helpers.returnJsonArray(responseData),
					{ itemData: { item: i } },
				);
				returnData.push(...executionData);
			} catch (error) {
				if (this.continueOnFail()) {
					const executionData = this.helpers.constructExecutionMetaData(
						this.helpers.returnJsonArray({ error: (error as Error).message }),
						{ itemData: { item: i } },
					);
					returnData.push(...executionData);
					continue;
				}
				throw error;
			}
		}

		return [returnData];
	}
}

async function chateryApiRequest(
	this: IExecuteFunctions,
	method: IHttpRequestMethods,
	endpoint: string,
	body: IDataObject,
	credentials: IDataObject,
): Promise<IDataObject> {
	const options: IHttpRequestOptions = {
		method,
		url: `${credentials.url}${endpoint}`,
		body,
		json: true,
		headers: {
			'Content-Type': 'application/json',
		},
	};

	if (credentials.apiKey) {
		options.headers!['X-Api-Key'] = credentials.apiKey as string;
	}

	try {
		const response = await this.helpers.httpRequest(options);
		return response as IDataObject;
	} catch (error) {
		throw new NodeApiError(this.getNode(), error as JsonObject);
	}
}

async function chateryApiRequestGet(
	this: IExecuteFunctions,
	method: IHttpRequestMethods,
	endpoint: string,
	credentials: IDataObject,
): Promise<IDataObject> {
	const options: IHttpRequestOptions = {
		method,
		url: `${credentials.url}${endpoint}`,
		json: true,
		headers: {
			'Content-Type': 'application/json',
		},
	};

	if (credentials.apiKey) {
		options.headers!['X-Api-Key'] = credentials.apiKey as string;
	}

	try {
		const response = await this.helpers.httpRequest(options);
		return response as IDataObject;
	} catch (error) {
		throw new NodeApiError(this.getNode(), error as JsonObject);
	}
}

async function chateryApiRequestDelete(
	this: IExecuteFunctions,
	method: IHttpRequestMethods,
	endpoint: string,
	body: IDataObject,
	credentials: IDataObject,
): Promise<IDataObject> {
	const options: IHttpRequestOptions = {
		method,
		url: `${credentials.url}${endpoint}`,
		body,
		json: true,
		headers: {
			'Content-Type': 'application/json',
		},
	};

	if (credentials.apiKey) {
		options.headers!['X-Api-Key'] = credentials.apiKey as string;
	}

	try {
		const response = await this.helpers.httpRequest(options);
		return response as IDataObject;
	} catch (error) {
		throw new NodeApiError(this.getNode(), error as JsonObject);
	}
}

async function chateryApiRequestPatch(
	this: IExecuteFunctions,
	method: IHttpRequestMethods,
	endpoint: string,
	body: IDataObject,
	credentials: IDataObject,
): Promise<IDataObject> {
	const options: IHttpRequestOptions = {
		method,
		url: `${credentials.url}${endpoint}`,
		body,
		json: true,
		headers: {
			'Content-Type': 'application/json',
		},
	};

	if (credentials.apiKey) {
		options.headers!['X-Api-Key'] = credentials.apiKey as string;
	}

	try {
		const response = await this.helpers.httpRequest(options);
		return response as IDataObject;
	} catch (error) {
		throw new NodeApiError(this.getNode(), error as JsonObject);
	}
}
