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
						name: 'Bulk',
						value: 'bulk',
					},
					{
						name: 'Chat',
						value: 'chat',
					},
					{
						name: 'Contact',
						value: 'contact',
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
						name: 'Label',
						value: 'label',
					},
					{
						name: 'Session',
						value: 'session',
					},
				],
				default: 'chat',
			},
			// Operations for Bulk
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: ['bulk'],
					},
				},
				options: [
					{
						name: 'Get All Jobs',
						value: 'getAllJobs',
						description: 'Get all bulk messaging jobs',
						action: 'Get all bulk messaging jobs',
					},
					{
						name: 'Get Job Status',
						value: 'getJobStatus',
						description: 'Get status of a bulk messaging job',
						action: 'Get status of a bulk messaging job',
					},
					{
						name: 'Send Bulk Document',
						value: 'sendBulkDocument',
						description: 'Send a document to multiple recipients',
						action: 'Send a document to multiple recipients',
					},
					{
						name: 'Send Bulk Image',
						value: 'sendBulkImage',
						description: 'Send an image to multiple recipients',
						action: 'Send an image to multiple recipients',
					},
					{
						name: 'Send Bulk Text',
						value: 'sendBulkText',
						description: 'Send a text message to multiple recipients',
						action: 'Send a text message to multiple recipients',
					},
				],
				default: 'sendBulkText',
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
					{
						name: 'Update Profile Name',
						value: 'updateProfileName',
						description: 'Update WhatsApp account display name',
						action: 'Update whats app profile display name',
					},
					{
						name: 'Update Profile Status',
						value: 'updateProfileStatus',
						description: 'Update WhatsApp account status or bio',
						action: 'Update whats app profile status',
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
						name: 'Get Invite Info',
						value: 'getInviteInfo',
						description: 'Get group information from invite code',
						action: 'Get group information from invite code',
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
						name: 'Archive Chat',
						value: 'archiveChat',
						description: 'Archive or unarchive a chat',
						action: 'Archive or unarchive a chat',
					},
					{
						name: 'Check Number',
						value: 'checkNumber',
						description: 'Check if a phone number is registered on WhatsApp',
						action: 'Check if a phone number is registered on whats app',
					},
					{
						name: 'Delete Message',
						value: 'deleteMessage',
						description: 'Delete (revoke) a message for everyone',
						action: 'Delete a message for everyone',
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
						name: 'Mute Chat',
						value: 'muteChat',
						description: 'Mute or unmute notifications for a chat',
						action: 'Mute or unmute a chat',
					},
					{
						name: 'Pin Chat',
						value: 'pinChat',
						description: 'Pin or unpin a chat in chat list',
						action: 'Pin or unpin a chat',
					},
					{
						name: 'Pin Message',
						value: 'pinMessage',
						description: 'Pin a message in a chat',
						action: 'Pin a message in a chat',
					},
					{
						name: 'Send Audio',
						value: 'sendAudio',
						description: 'Send an audio/voice note (OGG format only)',
						action: 'Send an audio voice note',
					},
					{
						name: 'Send Button',
						value: 'sendButton',
						description: 'Send a message with buttons (deprecated, uses Poll)',
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
						name: 'Send Poll',
						value: 'sendPoll',
						description: 'Send an interactive poll message',
						action: 'Send an interactive poll message',
					},
					{
						name: 'Send Presence Update',
						value: 'sendPresenceUpdate',
						description: 'Send presence update (typing, recording, etc.)',
						action: 'Send presence update',
					},
					{
						name: 'Send Reaction',
						value: 'sendReaction',
						description: 'Send an emoji reaction to a message',
						action: 'Send an emoji reaction to a message',
					},
					{
						name: 'Send Sticker',
						value: 'sendSticker',
						description: 'Send a sticker',
						action: 'Send a sticker',
					},
					{
						name: 'Send Text',
						value: 'sendText',
						description: 'Send a text message',
						action: 'Send a text message',
					},
					{
						name: 'Send Video',
						value: 'sendVideo',
						description: 'Send a video message',
						action: 'Send a video message',
					},
					{
						name: 'Star Message',
						value: 'starMessage',
						description: 'Star or unstar a message',
						action: 'Star or unstar a message',
					},
				],
				default: 'sendText',
			},
			// Operations for Contact
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: ['contact'],
					},
				},
				options: [
					{
						name: 'Add or Update',
						value: 'add',
						description: 'Add or update a contact in WhatsApp address book',
						action: 'Add or update a contact',
					},
					{
						name: 'Block or Unblock',
						value: 'block',
						description: 'Block or unblock a contact',
						action: 'Block or unblock a contact',
					},
					{
						name: 'Check Number',
						value: 'checkNumber',
						description: 'Check if a phone number is registered on WhatsApp',
						action: 'Check if a phone number is registered on whats app',
					},
					{
						name: 'Get Blocklist',
						value: 'blocklist',
						description: 'Get list of blocked contacts',
						action: 'Get list of blocked contacts',
					},
					{
						name: 'Get Business Profile',
						value: 'businessProfile',
						description: 'Get WhatsApp Business profile of a contact',
						action: 'Get business profile of a contact',
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
						name: 'Get Status / About',
						value: 'status',
						description: 'Get status or bio about of a contact',
						action: 'Get status of a contact',
					},
				],
				default: 'add',
			},
			// Operations for Label
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: ['label'],
					},
				},
				options: [
					{
						name: 'Add Label to Chat',
						value: 'addChat',
						description: 'Add a label to a chat',
						action: 'Add a label to a chat',
					},
					{
						name: 'Create',
						value: 'create',
						description: 'Create or update a label',
						action: 'Create a label',
					},
					{
						name: 'Delete',
						value: 'delete',
						description: 'Delete a label',
						action: 'Delete a label',
					},
					{
						name: 'Get All',
						value: 'list',
						description: 'Get all WhatsApp Business labels',
						action: 'Get all labels',
					},
					{
						name: 'Get Chat Labels',
						value: 'getChatLabels',
						description: 'Get labels assigned to a chat',
						action: 'Get labels assigned to a chat',
					},
					{
						name: 'Remove Label From Chat',
						value: 'removeChat',
						description: 'Remove a label from a chat',
						action: 'Remove a label from a chat',
					},
				],
				default: 'list',
			},

			// ==========================================
			// Common Fields: Session ID
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
						resource: ['bulk'],
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
						resource: ['contact'],
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
						resource: ['label'],
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
						operation: [
							'connect',
							'status',
							'updateConfig',
							'addWebhook',
							'removeWebhook',
							'qrCode',
							'qrImage',
							'delete',
							'updateProfileName',
							'updateProfileStatus',
						],
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
			// Common: Chat ID
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
						operation: [
							'archiveChat',
							'deleteMessage',
							'muteChat',
							'pinChat',
							'pinMessage',
							'sendAudio',
							'sendButton',
							'sendContact',
							'sendDocument',
							'sendImage',
							'sendLocation',
							'sendPoll',
							'sendPresenceUpdate',
							'sendReaction',
							'sendSticker',
							'sendText',
							'sendVideo',
							'starMessage',
						],
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
				description: 'The chat ID to associate with labels',
				displayOptions: {
					show: {
						resource: ['label'],
						operation: ['addChat', 'removeChat', 'getChatLabels'],
					},
				},
			},

			// ==========================================
			// Send Text Fields
			// ==========================================
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
			{
				displayName: 'Mentions',
				name: 'mentions',
				type: 'string',
				default: '',
				placeholder: '6281234567890,628987654321',
				description: 'Comma-separated phone numbers to mention in group chat',
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
			{
				displayName: 'Caption',
				name: 'documentCaption',
				type: 'string',
				default: '',
				description: 'Optional caption for the document',
				displayOptions: {
					show: {
						resource: ['chat'],
						operation: ['sendDocument'],
					},
				},
			},

			// ==========================================
			// Send Audio Fields
			// ==========================================
			{
				displayName: 'Audio URL',
				name: 'audioUrl',
				type: 'string',
				required: true,
				default: '',
				placeholder: 'https://example.com/audio.ogg',
				description: 'The URL of the audio file to send (OGG format with Opus codec only)',
				displayOptions: {
					show: {
						resource: ['chat'],
						operation: ['sendAudio'],
					},
				},
			},
			{
				displayName: 'Push To Talk (Voice Note)',
				name: 'ptt',
				type: 'boolean',
				default: false,
				description: 'Whether to send as voice note (true) or audio file (false)',
				displayOptions: {
					show: {
						resource: ['chat'],
						operation: ['sendAudio'],
					},
				},
			},

			// ==========================================
			// Send Video Fields
			// ==========================================
			{
				displayName: 'Video URL',
				name: 'videoUrl',
				type: 'string',
				required: true,
				default: '',
				placeholder: 'https://example.com/video.mp4',
				description: 'The URL of the video to send',
				displayOptions: {
					show: {
						resource: ['chat'],
						operation: ['sendVideo'],
					},
				},
			},
			{
				displayName: 'Video Caption',
				name: 'videoCaption',
				type: 'string',
				default: '',
				description: 'Optional caption for the video',
				displayOptions: {
					show: {
						resource: ['chat'],
						operation: ['sendVideo'],
					},
				},
			},
			{
				displayName: 'GIF Playback',
				name: 'gifPlayback',
				type: 'boolean',
				default: false,
				description: 'Whether the video should be played as an animated GIF',
				displayOptions: {
					show: {
						resource: ['chat'],
						operation: ['sendVideo'],
					},
				},
			},

			// ==========================================
			// Send Sticker Fields
			// ==========================================
			{
				displayName: 'Sticker URL',
				name: 'stickerUrl',
				type: 'string',
				required: true,
				default: '',
				placeholder: 'https://example.com/sticker.webp',
				description: 'The URL of the sticker to send (WebP or image)',
				displayOptions: {
					show: {
						resource: ['chat'],
						operation: ['sendSticker'],
					},
				},
			},

			// ==========================================
			// Message ID Field (Chat Operations)
			// ==========================================
			{
				displayName: 'Message ID',
				name: 'targetMessageId',
				type: 'string',
				required: true,
				default: '',
				placeholder: '3EB0...',
				description: 'The ID of the target message',
				displayOptions: {
					show: {
						resource: ['chat'],
						operation: ['deleteMessage', 'pinMessage', 'sendReaction', 'starMessage'],
					},
				},
			},

			// ==========================================
			// Send Reaction Fields
			// ==========================================
			{
				displayName: 'Emoji',
				name: 'reactionEmoji',
				type: 'string',
				default: '',
				placeholder: '👍',
				description: 'Emoji to react with. Leave empty to remove reaction.',
				displayOptions: {
					show: {
						resource: ['chat'],
						operation: ['sendReaction'],
					},
				},
			},
			{
				displayName: 'From Me',
				name: 'reactionFromMe',
				type: 'boolean',
				default: false,
				description: 'Whether the target message was sent by you',
				displayOptions: {
					show: {
						resource: ['chat'],
						operation: ['sendReaction', 'pinMessage', 'starMessage'],
					},
				},
			},

			// ==========================================
			// Pin Message Fields
			// ==========================================
			{
				displayName: 'Pin Duration',
				name: 'pinDuration',
				type: 'options',
				options: [
					{ name: '24 Hours', value: 86400 },
					{ name: '7 Days', value: 604800 },
					{ name: '30 Days', value: 2592000 },
				],
				default: 604800,
				description: 'Duration to keep the message pinned',
				displayOptions: {
					show: {
						resource: ['chat'],
						operation: ['pinMessage'],
					},
				},
			},

			// ==========================================
			// Star Message Fields
			// ==========================================
			{
				displayName: 'Star',
				name: 'starStatus',
				type: 'boolean',
				default: true,
				description: 'Whether to star (true) or unstar (false) the message',
				displayOptions: {
					show: {
						resource: ['chat'],
						operation: ['starMessage'],
					},
				},
			},

			// ==========================================
			// Pin Chat Fields
			// ==========================================
			{
				displayName: 'Pin',
				name: 'chatPinStatus',
				type: 'boolean',
				default: true,
				description: 'Whether to pin (true) or unpin (false) the chat',
				displayOptions: {
					show: {
						resource: ['chat'],
						operation: ['pinChat'],
					},
				},
			},

			// ==========================================
			// Archive Chat Fields
			// ==========================================
			{
				displayName: 'Archive',
				name: 'chatArchiveStatus',
				type: 'boolean',
				default: true,
				description: 'Whether to archive (true) or unarchive (false) the chat',
				displayOptions: {
					show: {
						resource: ['chat'],
						operation: ['archiveChat'],
					},
				},
			},

			// ==========================================
			// Mute Chat Fields
			// ==========================================
			{
				displayName: 'Mute Duration',
				name: 'chatMuteDuration',
				type: 'options',
				options: [
					{ name: 'Unmute', value: 0 },
					{ name: '8 Hours', value: 28800 },
					{ name: '1 Week', value: 604800 },
					{ name: 'Always (Forever)', value: -1 },
				],
				default: 28800,
				description: 'Duration to mute notifications for the chat',
				displayOptions: {
					show: {
						resource: ['chat'],
						operation: ['muteChat'],
					},
				},
			},

			// ==========================================
			// Send Poll Fields
			// ==========================================
			{
				displayName: 'Question',
				name: 'pollQuestion',
				type: 'string',
				required: true,
				default: '',
				placeholder: 'What is your favorite color?',
				description: 'The poll question',
				displayOptions: {
					show: {
						resource: ['chat'],
						operation: ['sendPoll'],
					},
				},
			},
			{
				displayName: 'Options',
				name: 'pollOptions',
				type: 'string',
				required: true,
				default: '',
				placeholder: 'Red,Blue,Green,Yellow',
				description: 'Comma-separated list of poll options (2-12 items)',
				displayOptions: {
					show: {
						resource: ['chat'],
						operation: ['sendPoll'],
					},
				},
			},
			{
				displayName: 'Selectable Count',
				name: 'selectableCount',
				type: 'number',
				default: 1,
				description: 'Number of options that can be selected (1 = single choice, >1 = multiple choice)',
				displayOptions: {
					show: {
						resource: ['chat'],
						operation: ['sendPoll'],
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
			// Send Contact Card Fields (Chat)
			// ==========================================
			{
				displayName: 'Contact Name',
				name: 'contactCardName',
				type: 'string',
				required: true,
				default: '',
				description: 'The name of the contact card to send',
				displayOptions: {
					show: {
						resource: ['chat'],
						operation: ['sendContact'],
					},
				},
			},
			{
				displayName: 'Contact Phone',
				name: 'contactCardPhone',
				type: 'string',
				required: true,
				default: '',
				placeholder: '6281234567890',
				description: 'The phone number of the contact card',
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
			// Phone Number Field (Chat & Contact)
			// ==========================================
			{
				displayName: 'Phone Number',
				name: 'phone',
				type: 'string',
				required: true,
				default: '',
				placeholder: '6281234567890',
				description: 'The phone number (e.g. 6281234567890 without + or spaces)',
				displayOptions: {
					show: {
						resource: ['chat'],
						operation: ['checkNumber', 'profilePicture', 'contactInfo'],
					},
				},
			},
			{
				displayName: 'Phone Number',
				name: 'phone',
				type: 'string',
				required: true,
				default: '',
				placeholder: '6281234567890',
				description: 'The phone number (e.g. 6281234567890 without + or spaces)',
				displayOptions: {
					show: {
						resource: ['contact'],
						operation: ['add', 'block', 'businessProfile', 'checkNumber', 'contactInfo', 'profilePicture', 'status'],
					},
				},
			},

			// ==========================================
			// Common Optional Fields (Chat)
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
						operation: [
							'sendAudio',
							'sendButton',
							'sendContact',
							'sendDocument',
							'sendImage',
							'sendLocation',
							'sendPoll',
							'sendText',
							'sendVideo',
						],
					},
				},
			},
			{
				displayName: 'Reply To Message ID',
				name: 'replyTo',
				type: 'string',
				default: '',
				description: 'Message ID to reply/quote to (optional)',
				displayOptions: {
					show: {
						resource: ['chat'],
						operation: [
							'sendAudio',
							'sendButton',
							'sendContact',
							'sendDocument',
							'sendImage',
							'sendLocation',
							'sendPoll',
							'sendSticker',
							'sendText',
							'sendVideo',
						],
					},
				},
			},

			// ==========================================
			// Contact Fields
			// ==========================================
			{
				displayName: 'Contact Name',
				name: 'targetContactName',
				type: 'string',
				required: true,
				default: '',
				description: 'The name of the contact in address book',
				displayOptions: {
					show: {
						resource: ['contact'],
						operation: ['add'],
					},
				},
			},
			{
				displayName: 'First Name',
				name: 'contactFirstName',
				type: 'string',
				default: '',
				description: 'Optional first name for the contact',
				displayOptions: {
					show: {
						resource: ['contact'],
						operation: ['add'],
					},
				},
			},
			{
				displayName: 'Sync to Primary Phone',
				name: 'syncContactToPhone',
				type: 'boolean',
				default: false,
				description: 'Whether to sync contact to primary phone native address book',
				displayOptions: {
					show: {
						resource: ['contact'],
						operation: ['add'],
					},
				},
			},
			{
				displayName: 'Action',
				name: 'contactBlockAction',
				type: 'options',
				options: [
					{ name: 'Block', value: 'block' },
					{ name: 'Unblock', value: 'unblock' },
				],
				default: 'block',
				description: 'Whether to block or unblock the contact',
				displayOptions: {
					show: {
						resource: ['contact'],
						operation: ['block'],
					},
				},
			},

			// ==========================================
			// Label Fields
			// ==========================================
			{
				displayName: 'Label Name',
				name: 'labelName',
				type: 'string',
				required: true,
				default: '',
				placeholder: 'Important',
				description: 'Name of the label',
				displayOptions: {
					show: {
						resource: ['label'],
						operation: ['create'],
					},
				},
			},
			{
				displayName: 'Color ID',
				name: 'labelColorId',
				type: 'number',
				default: 0,
				description: 'Color ID for the label (0 to 19)',
				displayOptions: {
					show: {
						resource: ['label'],
						operation: ['create'],
					},
				},
			},
			{
				displayName: 'Existing Label ID',
				name: 'editLabelId',
				type: 'string',
				default: '',
				description: 'Optional ID if updating an existing label',
				displayOptions: {
					show: {
						resource: ['label'],
						operation: ['create'],
					},
				},
			},
			{
				displayName: 'Label ID',
				name: 'labelId',
				type: 'string',
				required: true,
				default: '',
				description: 'The unique ID of the label',
				displayOptions: {
					show: {
						resource: ['label'],
						operation: ['addChat', 'delete', 'removeChat'],
					},
				},
			},

			// ==========================================
			// Session: Profile Fields
			// ==========================================
			{
				displayName: 'Display Name',
				name: 'profileName',
				type: 'string',
				required: true,
				default: '',
				description: 'New display name for your WhatsApp profile',
				displayOptions: {
					show: {
						resource: ['session'],
						operation: ['updateProfileName'],
					},
				},
			},
			{
				displayName: 'Status / Bio',
				name: 'profileStatus',
				type: 'string',
				required: true,
				default: '',
				description: 'New status/about text for your WhatsApp profile',
				displayOptions: {
					show: {
						resource: ['session'],
						operation: ['updateProfileStatus'],
					},
				},
			},

			// ==========================================
			// Bulk Messaging Fields
			// ==========================================
			{
				displayName: 'Recipients',
				name: 'recipients',
				type: 'string',
				required: true,
				default: '',
				placeholder: '628123456789,628987654321,628111222333',
				description: 'Comma-separated list of phone numbers (max 100)',
				displayOptions: {
					show: {
						resource: ['bulk'],
						operation: ['sendBulkText', 'sendBulkImage', 'sendBulkDocument'],
					},
				},
			},
			{
				displayName: 'Message',
				name: 'bulkMessage',
				type: 'string',
				typeOptions: {
					rows: 4,
				},
				required: true,
				default: '',
				description: 'The text message to send to all recipients',
				displayOptions: {
					show: {
						resource: ['bulk'],
						operation: ['sendBulkText'],
					},
				},
			},
			{
				displayName: 'Image URL',
				name: 'bulkImageUrl',
				type: 'string',
				required: true,
				default: '',
				placeholder: 'https://example.com/image.jpg',
				description: 'The URL of the image to send',
				displayOptions: {
					show: {
						resource: ['bulk'],
						operation: ['sendBulkImage'],
					},
				},
			},
			{
				displayName: 'Caption',
				name: 'bulkCaption',
				type: 'string',
				default: '',
				description: 'Optional caption for the image',
				displayOptions: {
					show: {
						resource: ['bulk'],
						operation: ['sendBulkImage'],
					},
				},
			},
			{
				displayName: 'Document URL',
				name: 'bulkDocumentUrl',
				type: 'string',
				required: true,
				default: '',
				placeholder: 'https://example.com/document.pdf',
				description: 'The URL of the document to send',
				displayOptions: {
					show: {
						resource: ['bulk'],
						operation: ['sendBulkDocument'],
					},
				},
			},
			{
				displayName: 'Filename',
				name: 'bulkFilename',
				type: 'string',
				required: true,
				default: '',
				placeholder: 'document.pdf',
				description: 'The filename to display for the document',
				displayOptions: {
					show: {
						resource: ['bulk'],
						operation: ['sendBulkDocument'],
					},
				},
			},
			{
				displayName: 'MIME Type',
				name: 'bulkMimetype',
				type: 'string',
				default: '',
				placeholder: 'application/pdf',
				description: 'The MIME type of the document (optional)',
				displayOptions: {
					show: {
						resource: ['bulk'],
						operation: ['sendBulkDocument'],
					},
				},
			},
			{
				displayName: 'Caption',
				name: 'bulkDocCaption',
				type: 'string',
				default: '',
				description: 'Optional caption for the document',
				displayOptions: {
					show: {
						resource: ['bulk'],
						operation: ['sendBulkDocument'],
					},
				},
			},
			{
				displayName: 'Delay Between Messages',
				name: 'delayBetweenMessages',
				type: 'number',
				default: 1000,
				description: 'Delay between messages in milliseconds (default: 1000)',
				displayOptions: {
					show: {
						resource: ['bulk'],
						operation: ['sendBulkText', 'sendBulkImage', 'sendBulkDocument'],
					},
				},
			},
			{
				displayName: 'Typing Time',
				name: 'bulkTypingTime',
				type: 'number',
				default: 0,
				description: 'Typing indicator duration in milliseconds (default: 0)',
				displayOptions: {
					show: {
						resource: ['bulk'],
						operation: ['sendBulkText', 'sendBulkImage', 'sendBulkDocument'],
					},
				},
			},
			{
				displayName: 'Job ID',
				name: 'jobId',
				type: 'string',
				required: true,
				default: '',
				placeholder: 'bulk_1704326400000_abc123def',
				description: 'The job ID returned from a bulk send operation',
				displayOptions: {
					show: {
						resource: ['bulk'],
						operation: ['getJobStatus'],
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
									{ name: 'All', value: 'all' },
									{ name: 'Call', value: 'call' },
									{ name: 'Chat Delete', value: 'chat.delete' },
									{ name: 'Chat Update', value: 'chat.update' },
									{ name: 'Chat Upsert', value: 'chat.upsert' },
									{ name: 'Connection Update', value: 'connection.update' },
									{ name: 'Contact Update', value: 'contact.update' },
									{ name: 'Group Participants', value: 'group.participants' },
									{ name: 'Group Update', value: 'group.update' },
									{ name: 'Labels', value: 'labels' },
									{ name: 'Logged Out', value: 'logged.out' },
									{ name: 'Message', value: 'message' },
									{ name: 'Message Reaction', value: 'message.reaction' },
									{ name: 'Message Revoke', value: 'message.revoke' },
									{ name: 'Message Sent', value: 'message.sent' },
									{ name: 'Message Update', value: 'message.update' },
									{ name: 'Presence Update', value: 'presence.update' },
									{ name: 'QR', value: 'qr' },
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
					{ name: 'All', value: 'all' },
					{ name: 'Call', value: 'call' },
					{ name: 'Chat Delete', value: 'chat.delete' },
					{ name: 'Chat Update', value: 'chat.update' },
					{ name: 'Chat Upsert', value: 'chat.upsert' },
					{ name: 'Connection Update', value: 'connection.update' },
					{ name: 'Contact Update', value: 'contact.update' },
					{ name: 'Group Participants', value: 'group.participants' },
					{ name: 'Group Update', value: 'group.update' },
					{ name: 'Labels', value: 'labels' },
					{ name: 'Logged Out', value: 'logged.out' },
					{ name: 'Message', value: 'message' },
					{ name: 'Message Reaction', value: 'message.reaction' },
					{ name: 'Message Revoke', value: 'message.revoke' },
					{ name: 'Message Sent', value: 'message.sent' },
					{ name: 'Message Update', value: 'message.update' },
					{ name: 'Presence Update', value: 'presence.update' },
					{ name: 'QR', value: 'qr' },
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
						operation: ['contacts', 'messages', 'overview'],
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
						operation: ['contacts', 'overview'],
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
						operation: ['info', 'markRead', 'messages'],
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
				description: 'The group ID (e.g. 123456789012345678@g.us)',
				displayOptions: {
					show: {
						resource: ['group'],
						operation: [
							'addParticipants',
							'demoteParticipants',
							'getInviteCode',
							'leave',
							'metadata',
							'promoteParticipants',
							'removeParticipants',
							'revokeInvite',
							'updateDescription',
							'updatePicture',
							'updateSettings',
							'updateSubject',
						],
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
						operation: ['addParticipants', 'create', 'demoteParticipants', 'promoteParticipants', 'removeParticipants'],
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
				description: 'The invite code of the group',
				displayOptions: {
					show: {
						resource: ['group'],
						operation: ['getInviteInfo', 'join'],
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
						const typingTime = this.getNodeParameter('typingTime', i, 0) as number;
						const replyTo = this.getNodeParameter('replyTo', i, '') as string;
						const mentionsStr = this.getNodeParameter('mentions', i, '') as string;

						const body: IDataObject = {
							sessionId,
							chatId,
							message,
						};
						if (typingTime > 0) {
							body.typingTime = typingTime;
						}
						if (replyTo) {
							body.replyTo = replyTo;
						}
						if (mentionsStr) {
							body.mentions = mentionsStr.split(',').map((m) => m.trim()).filter((m) => m);
						}

						responseData = await chateryApiRequest.call(this, 'POST', '/api/whatsapp/chats/send-text', body, credentials);
					} else if (operation === 'sendImage') {
						const chatId = this.getNodeParameter('chatId', i) as string;
						const imageUrl = this.getNodeParameter('imageUrl', i) as string;
						const caption = this.getNodeParameter('caption', i, '') as string;
						const typingTime = this.getNodeParameter('typingTime', i, 0) as number;
						const replyTo = this.getNodeParameter('replyTo', i, '') as string;

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
						if (replyTo) {
							body.replyTo = replyTo;
						}

						responseData = await chateryApiRequest.call(this, 'POST', '/api/whatsapp/chats/send-image', body, credentials);
					} else if (operation === 'sendDocument') {
						const chatId = this.getNodeParameter('chatId', i) as string;
						const documentUrl = this.getNodeParameter('documentUrl', i) as string;
						const filename = this.getNodeParameter('filename', i) as string;
						const mimetype = this.getNodeParameter('mimetype', i, '') as string;
						const documentCaption = this.getNodeParameter('documentCaption', i, '') as string;
						const typingTime = this.getNodeParameter('typingTime', i, 0) as number;
						const replyTo = this.getNodeParameter('replyTo', i, '') as string;

						const body: IDataObject = {
							sessionId,
							chatId,
							documentUrl,
							filename,
						};
						if (mimetype) {
							body.mimetype = mimetype;
						}
						if (documentCaption) {
							body.caption = documentCaption;
						}
						if (typingTime > 0) {
							body.typingTime = typingTime;
						}
						if (replyTo) {
							body.replyTo = replyTo;
						}

						responseData = await chateryApiRequest.call(this, 'POST', '/api/whatsapp/chats/send-document', body, credentials);
					} else if (operation === 'sendAudio') {
						const chatId = this.getNodeParameter('chatId', i) as string;
						const audioUrl = this.getNodeParameter('audioUrl', i) as string;
						const ptt = this.getNodeParameter('ptt', i, false) as boolean;
						const typingTime = this.getNodeParameter('typingTime', i, 0) as number;
						const replyTo = this.getNodeParameter('replyTo', i, '') as string;

						const body: IDataObject = {
							sessionId,
							chatId,
							audioUrl,
							ptt,
						};
						if (typingTime > 0) {
							body.typingTime = typingTime;
						}
						if (replyTo) {
							body.replyTo = replyTo;
						}

						responseData = await chateryApiRequest.call(this, 'POST', '/api/whatsapp/chats/send-audio', body, credentials);
					} else if (operation === 'sendVideo') {
						const chatId = this.getNodeParameter('chatId', i) as string;
						const videoUrl = this.getNodeParameter('videoUrl', i) as string;
						const caption = this.getNodeParameter('videoCaption', i, '') as string;
						const gifPlayback = this.getNodeParameter('gifPlayback', i, false) as boolean;
						const typingTime = this.getNodeParameter('typingTime', i, 0) as number;
						const replyTo = this.getNodeParameter('replyTo', i, '') as string;

						const body: IDataObject = {
							sessionId,
							chatId,
							videoUrl,
						};
						if (caption) {
							body.caption = caption;
						}
						if (gifPlayback) {
							body.gifPlayback = gifPlayback;
						}
						if (typingTime > 0) {
							body.typingTime = typingTime;
						}
						if (replyTo) {
							body.replyTo = replyTo;
						}

						responseData = await chateryApiRequest.call(this, 'POST', '/api/whatsapp/chats/send-video', body, credentials);
					} else if (operation === 'sendSticker') {
						const chatId = this.getNodeParameter('chatId', i) as string;
						const stickerUrl = this.getNodeParameter('stickerUrl', i) as string;
						const replyTo = this.getNodeParameter('replyTo', i, '') as string;

						const body: IDataObject = {
							sessionId,
							chatId,
							stickerUrl,
						};
						if (replyTo) {
							body.replyTo = replyTo;
						}

						responseData = await chateryApiRequest.call(this, 'POST', '/api/whatsapp/chats/send-sticker', body, credentials);
					} else if (operation === 'sendReaction') {
						const chatId = this.getNodeParameter('chatId', i) as string;
						const messageId = this.getNodeParameter('targetMessageId', i) as string;
						const emoji = this.getNodeParameter('reactionEmoji', i, '') as string;
						const fromMe = this.getNodeParameter('reactionFromMe', i, false) as boolean;

						const body: IDataObject = {
							sessionId,
							chatId,
							messageId,
							emoji,
							fromMe,
						};

						responseData = await chateryApiRequest.call(this, 'POST', '/api/whatsapp/chats/send-reaction', body, credentials);
					} else if (operation === 'deleteMessage') {
						const chatId = this.getNodeParameter('chatId', i) as string;
						const messageId = this.getNodeParameter('targetMessageId', i) as string;

						const body: IDataObject = {
							sessionId,
							chatId,
							messageId,
						};

						responseData = await chateryApiRequest.call(this, 'POST', '/api/whatsapp/chats/delete-message', body, credentials);
					} else if (operation === 'pinMessage') {
						const chatId = this.getNodeParameter('chatId', i) as string;
						const messageId = this.getNodeParameter('targetMessageId', i) as string;
						const time = this.getNodeParameter('pinDuration', i, 604800) as number;
						const fromMe = this.getNodeParameter('reactionFromMe', i, false) as boolean;

						const body: IDataObject = {
							sessionId,
							chatId,
							messageId,
							time,
							fromMe,
						};

						responseData = await chateryApiRequest.call(this, 'POST', '/api/whatsapp/chats/pin-message', body, credentials);
					} else if (operation === 'starMessage') {
						const chatId = this.getNodeParameter('chatId', i) as string;
						const messageId = this.getNodeParameter('targetMessageId', i) as string;
						const star = this.getNodeParameter('starStatus', i, true) as boolean;
						const fromMe = this.getNodeParameter('reactionFromMe', i, false) as boolean;

						const body: IDataObject = {
							sessionId,
							chatId,
							messageId,
							star,
							fromMe,
						};

						responseData = await chateryApiRequest.call(this, 'POST', '/api/whatsapp/chats/star-message', body, credentials);
					} else if (operation === 'pinChat') {
						const chatId = this.getNodeParameter('chatId', i) as string;
						const pin = this.getNodeParameter('chatPinStatus', i, true) as boolean;

						const body: IDataObject = {
							sessionId,
							chatId,
							pin,
						};

						responseData = await chateryApiRequest.call(this, 'POST', '/api/whatsapp/chats/pin', body, credentials);
					} else if (operation === 'archiveChat') {
						const chatId = this.getNodeParameter('chatId', i) as string;
						const archive = this.getNodeParameter('chatArchiveStatus', i, true) as boolean;

						const body: IDataObject = {
							sessionId,
							chatId,
							archive,
						};

						responseData = await chateryApiRequest.call(this, 'POST', '/api/whatsapp/chats/archive', body, credentials);
					} else if (operation === 'muteChat') {
						const chatId = this.getNodeParameter('chatId', i) as string;
						const duration = this.getNodeParameter('chatMuteDuration', i, 28800) as number;

						const body: IDataObject = {
							sessionId,
							chatId,
							duration,
						};

						responseData = await chateryApiRequest.call(this, 'POST', '/api/whatsapp/chats/mute', body, credentials);
					} else if (operation === 'sendLocation') {
						const chatId = this.getNodeParameter('chatId', i) as string;
						const latitude = this.getNodeParameter('latitude', i) as number;
						const longitude = this.getNodeParameter('longitude', i) as number;
						const locationName = this.getNodeParameter('locationName', i, '') as string;
						const typingTime = this.getNodeParameter('typingTime', i, 0) as number;
						const replyTo = this.getNodeParameter('replyTo', i, '') as string;

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
						if (replyTo) {
							body.replyTo = replyTo;
						}

						responseData = await chateryApiRequest.call(this, 'POST', '/api/whatsapp/chats/send-location', body, credentials);
					} else if (operation === 'sendContact') {
						const chatId = this.getNodeParameter('chatId', i) as string;
						const contactName = this.getNodeParameter('contactCardName', i) as string;
						const contactPhone = this.getNodeParameter('contactCardPhone', i) as string;
						const typingTime = this.getNodeParameter('typingTime', i, 0) as number;
						const replyTo = this.getNodeParameter('replyTo', i, '') as string;

						const body: IDataObject = {
							sessionId,
							chatId,
							contactName,
							contactPhone,
						};
						if (typingTime > 0) {
							body.typingTime = typingTime;
						}
						if (replyTo) {
							body.replyTo = replyTo;
						}

						responseData = await chateryApiRequest.call(this, 'POST', '/api/whatsapp/chats/send-contact', body, credentials);
					} else if (operation === 'sendButton') {
						const chatId = this.getNodeParameter('chatId', i) as string;
						const text = this.getNodeParameter('buttonText', i) as string;
						const footer = this.getNodeParameter('footer', i, '') as string;
						const buttonsData = this.getNodeParameter('buttons', i, {}) as IDataObject;
						const typingTime = this.getNodeParameter('typingTime', i, 0) as number;
						const replyTo = this.getNodeParameter('replyTo', i, '') as string;

						const buttons: string[] = [];
						if (buttonsData.buttonValues) {
							const buttonValues = buttonsData.buttonValues as IDataObject[];
							for (const button of buttonValues) {
								buttons.push(button.text as string);
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
						if (replyTo) {
							body.replyTo = replyTo;
						}

						responseData = await chateryApiRequest.call(this, 'POST', '/api/whatsapp/chats/send-button', body, credentials);
					} else if (operation === 'sendPoll') {
						const chatId = this.getNodeParameter('chatId', i) as string;
						const question = this.getNodeParameter('pollQuestion', i) as string;
						const optionsStr = this.getNodeParameter('pollOptions', i) as string;
						const selectableCount = this.getNodeParameter('selectableCount', i, 1) as number;
						const typingTime = this.getNodeParameter('typingTime', i, 0) as number;
						const replyTo = this.getNodeParameter('replyTo', i, '') as string;

						const options = optionsStr.split(',').map((o) => o.trim()).filter((o) => o);

						const body: IDataObject = {
							sessionId,
							chatId,
							question,
							options,
						};
						if (selectableCount > 1) {
							body.selectableCount = selectableCount;
						}
						if (typingTime > 0) {
							body.typingTime = typingTime;
						}
						if (replyTo) {
							body.replyTo = replyTo;
						}

						responseData = await chateryApiRequest.call(this, 'POST', '/api/whatsapp/chats/send-poll', body, credentials);
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
				} else if (resource === 'contact') {
					if (operation === 'add') {
						const phone = this.getNodeParameter('phone', i) as string;
						const name = this.getNodeParameter('targetContactName', i) as string;
						const firstName = this.getNodeParameter('contactFirstName', i, '') as string;
						const syncContactToPhone = this.getNodeParameter('syncContactToPhone', i, false) as boolean;

						const body: IDataObject = {
							sessionId,
							phone,
							name,
						};
						if (firstName) {
							body.firstName = firstName;
						}
						if (syncContactToPhone) {
							body.syncContactToPhone = syncContactToPhone;
						}

						responseData = await chateryApiRequest.call(this, 'POST', '/api/whatsapp/contacts/add', body, credentials);
					} else if (operation === 'status') {
						const phone = this.getNodeParameter('phone', i) as string;
						const body: IDataObject = { sessionId, phone };
						responseData = await chateryApiRequest.call(this, 'POST', '/api/whatsapp/contacts/status', body, credentials);
					} else if (operation === 'businessProfile') {
						const phone = this.getNodeParameter('phone', i) as string;
						const body: IDataObject = { sessionId, phone };
						responseData = await chateryApiRequest.call(this, 'POST', '/api/whatsapp/contacts/business-profile', body, credentials);
					} else if (operation === 'block') {
						const phone = this.getNodeParameter('phone', i) as string;
						const action = this.getNodeParameter('contactBlockAction', i, 'block') as string;
						const body: IDataObject = { sessionId, phone, action };
						responseData = await chateryApiRequest.call(this, 'POST', '/api/whatsapp/contacts/block', body, credentials);
					} else if (operation === 'blocklist') {
						const body: IDataObject = { sessionId };
						responseData = await chateryApiRequest.call(this, 'POST', '/api/whatsapp/contacts/blocklist', body, credentials);
					} else if (operation === 'checkNumber') {
						const phone = this.getNodeParameter('phone', i) as string;
						const body: IDataObject = { sessionId, phone };
						responseData = await chateryApiRequest.call(this, 'POST', '/api/whatsapp/chats/check-number', body, credentials);
					} else if (operation === 'profilePicture') {
						const phone = this.getNodeParameter('phone', i) as string;
						const body: IDataObject = { sessionId, phone };
						responseData = await chateryApiRequest.call(this, 'POST', '/api/whatsapp/chats/profile-picture', body, credentials);
					} else if (operation === 'contactInfo') {
						const phone = this.getNodeParameter('phone', i) as string;
						const body: IDataObject = { sessionId, phone };
						responseData = await chateryApiRequest.call(this, 'POST', '/api/whatsapp/chats/contact-info', body, credentials);
					} else {
						throw new NodeApiError(this.getNode(), { message: `Unknown operation: ${operation}` });
					}

					const executionData = this.helpers.constructExecutionMetaData(
						this.helpers.returnJsonArray(responseData),
						{ itemData: { item: i } },
					);
					returnData.push(...executionData);
					continue;
				} else if (resource === 'label') {
					if (operation === 'list') {
						const body: IDataObject = { sessionId };
						responseData = await chateryApiRequest.call(this, 'POST', '/api/whatsapp/labels', body, credentials);
					} else if (operation === 'create') {
						const name = this.getNodeParameter('labelName', i) as string;
						const colorId = this.getNodeParameter('labelColorId', i, 0) as number;
						const labelId = this.getNodeParameter('editLabelId', i, '') as string;

						const body: IDataObject = { sessionId, name, colorId };
						if (labelId) {
							body.labelId = labelId;
						}

						responseData = await chateryApiRequest.call(this, 'POST', '/api/whatsapp/labels/create', body, credentials);
					} else if (operation === 'delete') {
						const labelId = this.getNodeParameter('labelId', i) as string;
						const body: IDataObject = { sessionId, labelId };
						responseData = await chateryApiRequest.call(this, 'POST', '/api/whatsapp/labels/delete', body, credentials);
					} else if (operation === 'addChat') {
						const chatId = this.getNodeParameter('chatId', i) as string;
						const labelId = this.getNodeParameter('labelId', i) as string;
						const body: IDataObject = { sessionId, chatId, labelId };
						responseData = await chateryApiRequest.call(this, 'POST', '/api/whatsapp/labels/chat/add', body, credentials);
					} else if (operation === 'removeChat') {
						const chatId = this.getNodeParameter('chatId', i) as string;
						const labelId = this.getNodeParameter('labelId', i) as string;
						const body: IDataObject = { sessionId, chatId, labelId };
						responseData = await chateryApiRequest.call(this, 'POST', '/api/whatsapp/labels/chat/remove', body, credentials);
					} else if (operation === 'getChatLabels') {
						const chatId = this.getNodeParameter('chatId', i) as string;
						const body: IDataObject = { sessionId, chatId };
						responseData = await chateryApiRequest.call(this, 'POST', '/api/whatsapp/labels/chat', body, credentials);
					} else {
						throw new NodeApiError(this.getNode(), { message: `Unknown operation: ${operation}` });
					}

					const executionData = this.helpers.constructExecutionMetaData(
						this.helpers.returnJsonArray(responseData),
						{ itemData: { item: i } },
					);
					returnData.push(...executionData);
					continue;
				} else if (resource === 'bulk') {
					if (operation === 'sendBulkText') {
						const recipientsStr = this.getNodeParameter('recipients', i) as string;
						const recipients = recipientsStr.split(',').map((r) => r.trim()).filter((r) => r);
						const message = this.getNodeParameter('bulkMessage', i) as string;
						const delayBetweenMessages = this.getNodeParameter('delayBetweenMessages', i, 1000) as number;
						const typingTime = this.getNodeParameter('bulkTypingTime', i, 0) as number;

						const body: IDataObject = {
							sessionId,
							recipients,
							message,
						};
						if (delayBetweenMessages > 0) {
							body.delayBetweenMessages = delayBetweenMessages;
						}
						if (typingTime > 0) {
							body.typingTime = typingTime;
						}

						responseData = await chateryApiRequest.call(this, 'POST', '/api/whatsapp/chats/send-bulk', body, credentials);
					} else if (operation === 'sendBulkImage') {
						const recipientsStr = this.getNodeParameter('recipients', i) as string;
						const recipients = recipientsStr.split(',').map((r) => r.trim()).filter((r) => r);
						const imageUrl = this.getNodeParameter('bulkImageUrl', i) as string;
						const caption = this.getNodeParameter('bulkCaption', i, '') as string;
						const delayBetweenMessages = this.getNodeParameter('delayBetweenMessages', i, 1000) as number;
						const typingTime = this.getNodeParameter('bulkTypingTime', i, 0) as number;

						const body: IDataObject = {
							sessionId,
							recipients,
							imageUrl,
						};
						if (caption) {
							body.caption = caption;
						}
						if (delayBetweenMessages > 0) {
							body.delayBetweenMessages = delayBetweenMessages;
						}
						if (typingTime > 0) {
							body.typingTime = typingTime;
						}

						responseData = await chateryApiRequest.call(this, 'POST', '/api/whatsapp/chats/send-bulk-image', body, credentials);
					} else if (operation === 'sendBulkDocument') {
						const recipientsStr = this.getNodeParameter('recipients', i) as string;
						const recipients = recipientsStr.split(',').map((r) => r.trim()).filter((r) => r);
						const documentUrl = this.getNodeParameter('bulkDocumentUrl', i) as string;
						const filename = this.getNodeParameter('bulkFilename', i) as string;
						const mimetype = this.getNodeParameter('bulkMimetype', i, '') as string;
						const bulkDocCaption = this.getNodeParameter('bulkDocCaption', i, '') as string;
						const delayBetweenMessages = this.getNodeParameter('delayBetweenMessages', i, 1000) as number;
						const typingTime = this.getNodeParameter('bulkTypingTime', i, 0) as number;

						const body: IDataObject = {
							sessionId,
							recipients,
							documentUrl,
							filename,
						};
						if (mimetype) {
							body.mimetype = mimetype;
						}
						if (bulkDocCaption) {
							body.caption = bulkDocCaption;
						}
						if (delayBetweenMessages > 0) {
							body.delayBetweenMessages = delayBetweenMessages;
						}
						if (typingTime > 0) {
							body.typingTime = typingTime;
						}

						responseData = await chateryApiRequest.call(this, 'POST', '/api/whatsapp/chats/send-bulk-document', body, credentials);
					} else if (operation === 'getJobStatus') {
						const jobId = this.getNodeParameter('jobId', i) as string;

						responseData = await chateryApiRequestGet.call(this, 'GET', `/api/whatsapp/chats/bulk-status/${jobId}`, credentials);
					} else if (operation === 'getAllJobs') {
						const body: IDataObject = { sessionId };

						responseData = await chateryApiRequest.call(this, 'POST', '/api/whatsapp/chats/bulk-jobs', body, credentials);
					} else {
						throw new NodeApiError(this.getNode(), { message: `Unknown operation: ${operation}` });
					}

					const executionData = this.helpers.constructExecutionMetaData(
						this.helpers.returnJsonArray(responseData),
						{ itemData: { item: i } },
					);
					returnData.push(...executionData);
					continue;
				} else if (resource === 'session') {
					if (operation === 'list') {
						responseData = await chateryApiRequestGet.call(this, 'GET', '/api/whatsapp/sessions', credentials);
					} else if (operation === 'connect') {
						const metadataStr = this.getNodeParameter('metadata', i, '{}') as string;
						const webhooksData = this.getNodeParameter('webhooks', i, {}) as IDataObject;

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
						responseData = await chateryApiRequestGet.call(this, 'GET', `/api/whatsapp/sessions/${sessionId}/status`, credentials);
					} else if (operation === 'updateConfig') {
						const metadataStr = this.getNodeParameter('metadata', i, '{}') as string;
						const webhooksData = this.getNodeParameter('webhooks', i, {}) as IDataObject;

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
						const webhookUrl = this.getNodeParameter('webhookUrl', i) as string;
						const webhookEvents = this.getNodeParameter('webhookEvents', i, []) as string[];

						const body: IDataObject = {
							url: webhookUrl,
						};
						if (webhookEvents && webhookEvents.length > 0) {
							body.events = webhookEvents;
						}

						responseData = await chateryApiRequest.call(this, 'POST', `/api/whatsapp/sessions/${sessionId}/webhooks`, body, credentials);
					} else if (operation === 'removeWebhook') {
						const webhookUrl = this.getNodeParameter('webhookUrl', i) as string;

						const body: IDataObject = {
							url: webhookUrl,
						};

						responseData = await chateryApiRequestDelete.call(this, 'DELETE', `/api/whatsapp/sessions/${sessionId}/webhooks`, body, credentials);
					} else if (operation === 'qrCode') {
						responseData = await chateryApiRequestGet.call(this, 'GET', `/api/whatsapp/sessions/${sessionId}/qr`, credentials);
					} else if (operation === 'qrImage') {
						responseData = await chateryApiRequestGet.call(this, 'GET', `/api/whatsapp/sessions/${sessionId}/qr/image`, credentials);
					} else if (operation === 'delete') {
						responseData = await chateryApiRequestDelete.call(this, 'DELETE', `/api/whatsapp/sessions/${sessionId}`, {}, credentials);
					} else if (operation === 'updateProfileName') {
						const name = this.getNodeParameter('profileName', i) as string;
						const body: IDataObject = { sessionId, name };
						responseData = await chateryApiRequest.call(this, 'POST', '/api/whatsapp/profile/name', body, credentials);
					} else if (operation === 'updateProfileStatus') {
						const status = this.getNodeParameter('profileStatus', i) as string;
						const body: IDataObject = { sessionId, status };
						responseData = await chateryApiRequest.call(this, 'POST', '/api/whatsapp/profile/status', body, credentials);
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
					if (operation === 'overview') {
						const limit = this.getNodeParameter('limit', i, 50) as number;
						const offset = this.getNodeParameter('offset', i, 0) as number;
						const chatType = this.getNodeParameter('chatType', i, '') as string;

						const body: IDataObject = { sessionId };
						if (limit) body.limit = limit;
						if (offset) body.offset = offset;
						if (chatType) body.type = chatType;

						responseData = await chateryApiRequest.call(this, 'POST', '/api/whatsapp/chats/overview', body, credentials);
					} else if (operation === 'contacts') {
						const limit = this.getNodeParameter('limit', i, 50) as number;
						const offset = this.getNodeParameter('offset', i, 0) as number;
						const search = this.getNodeParameter('search', i, '') as string;

						const body: IDataObject = { sessionId };
						if (limit) body.limit = limit;
						if (offset) body.offset = offset;
						if (search) body.search = search;

						responseData = await chateryApiRequest.call(this, 'POST', '/api/whatsapp/contacts', body, credentials);
					} else if (operation === 'messages') {
						const chatId = this.getNodeParameter('chatId', i) as string;
						const limit = this.getNodeParameter('limit', i, 50) as number;
						const cursor = this.getNodeParameter('cursor', i, '') as string;

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
						const messageId = this.getNodeParameter('messageId', i, '') as string;

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
					} else if (operation === 'getInviteInfo') {
						const inviteCode = this.getNodeParameter('inviteCode', i) as string;

						const body: IDataObject = { sessionId, inviteCode };

						responseData = await chateryApiRequest.call(this, 'POST', '/api/whatsapp/groups/invite-info', body, credentials);
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
