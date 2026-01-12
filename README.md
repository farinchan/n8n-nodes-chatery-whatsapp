# n8n-nodes-chatery-whatsapp

[![NPM Version](https://img.shields.io/npm/v/n8n-nodes-chatery-whatsapp)](https://www.npmjs.com/package/n8n-nodes-chatery-whatsapp)
[![NPM Downloads](https://img.shields.io/npm/dm/n8n-nodes-chatery-whatsapp)](https://www.npmjs.com/package/n8n-nodes-chatery-whatsapp)

![Chatery](https://sgp.cloud.appwrite.io/v1/storage/buckets/6941a5b70012d918c7aa/files/6941a69000028dec52d2/view?project=694019b0000abc694483&token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbklkIjoiNjk0MWE4NjRjZGNhZGUxOTZmNTMiLCJyZXNvdXJjZUlkIjoiNjk0MWE1YjcwMDEyZDkxOGM3YWE6Njk0MWE2OTAwMDAyOGRlYzUyZDIiLCJyZXNvdXJjZVR5cGUiOiJmaWxlcyIsInJlc291cmNlSW50ZXJuYWxJZCI6IjE0NTE6MSIsImlhdCI6MTc2NTkxMDYyOH0.6DyBMKwzA6x__pQZn3vICDLdBfo0mEUlyMVAc3qEnyo)
![n8n.io - Workflow Automation](https://raw.githubusercontent.com/n8n-io/n8n/master/assets/n8n-logo.png)

This is an n8n community node for integrating with **Chatery WhatsApp API**. It allows you to automate WhatsApp messaging, manage sessions, retrieve chat history, and handle groups directly from your n8n workflows.

[n8n](https://n8n.io/) is a [fair-code licensed](https://docs.n8n.io/reference/license/) workflow automation platform.

## Table of Contents

- [Installation](#installation)
- [Credentials](#credentials)
- [Nodes](#nodes)
  - [Chatery WhatsApp Trigger](#chatery-whatsapp-trigger)
  - [Chatery WhatsApp](#chatery-whatsapp)
- [Resources & Operations](#resources--operations)
- [Compatibility](#compatibility)
- [Usage Examples](#usage-examples)
- [License](#license)

## Installation

Follow the [installation guide](https://docs.n8n.io/integrations/community-nodes/installation/) in the n8n community nodes documentation.

### npm Installation

```bash
npm install n8n-nodes-chatery-whatsapp
```

### Manual Installation

1. Go to **Settings > Community Nodes**
2. Select **Install**
3. Enter `n8n-nodes-chatery-whatsapp` in the **Enter npm package name** field
4. Agree to the risks of using community nodes
5. Click **Install**

## Credentials

To use this node, you need to configure the **Chatery API** credentials:

| Field | Description |
|-------|-------------|
| **URL** | Your Chatery WhatsApp API host URL (e.g., `https://api.chatery.io`) |
| **API Key** | Your API key for authentication (optional, depending on your setup) |

## Nodes

This package includes two nodes:

### Chatery WhatsApp Trigger

A webhook trigger node that listens for WhatsApp events from the Chatery API.

**Supported Events:**
| Event | Description |
|-------|-------------|
| `all` | Listen to all events |
| `qr` | QR code generated for authentication |
| `connection.update` | Connection status changed (connected, disconnected) |
| `message` | New message received |
| `message.sent` | Message sent confirmation |
| `message.update` | Message status update (read, delivered) |
| `message.reaction` | Message reaction added |
| `message.revoke` | Message deleted/revoked |
| `presence.update` | Typing, online status |
| `group.participants` | Group members changed |
| `group.update` | Group info changed |
| `chat.update` | Chat updated |
| `chat.upsert` | New chat created |
| `chat.delete` | Chat deleted |
| `contact.update` | Contact updated |
| `call` | Incoming call |
| `labels` | Labels updated (business) |
| `logged.out` | Session logged out |

**Options:**
- **Session Filter**: Filter events by specific session ID
- **Chat ID Filter**: Filter events by specific chat ID
- **Ignore Status**: Ignore status/story updates
- **Only From Me**: Only receive messages sent by you
- **Only From Others**: Only receive messages from others

### Chatery WhatsApp

The main node for performing WhatsApp operations via HTTP requests.

## Resources & Operations

### Bulk Resource (NEW!)

Send messages to multiple recipients with background processing.

| Operation | Description |
|-----------|-------------|
| **Send Bulk Text** | Send a text message to multiple recipients |
| **Send Bulk Image** | Send an image to multiple recipients |
| **Send Bulk Document** | Send a document to multiple recipients |
| **Get Job Status** | Get status of a bulk messaging job |
| **Get All Jobs** | Get all bulk messaging jobs |

### Chat Resource

| Operation | Description |
|-----------|-------------|
| **Send Text** | Send a text message (supports replyTo) |
| **Send Image** | Send an image with optional caption (supports replyTo) |
| **Send Document** | Send a document/file (supports replyTo) |
| **Send Location** | Send a location with coordinates (supports replyTo) |
| **Send Contact** | Send a contact card (supports replyTo) |
| **Send Button** | Send a message with buttons (supports replyTo) |
| **Send Presence Update** | Update your presence status |
| **Check Number** | Check if a number is registered on WhatsApp |
| **Profile Picture** | Get a contact's profile picture URL |
| **Contact Info** | Get detailed information about a contact |

> **NEW:** All send operations now support `replyTo` parameter to reply/quote specific messages!

### Session Resource

| Operation | Description |
|-----------|-------------|
| **List** | List all available sessions |
| **Connect** | Connect/start a new session |
| **Status** | Get the status of a session |
| **Update Config** | Update session configuration |
| **Add Webhook** | Add a webhook URL to receive events |
| **Remove Webhook** | Remove a webhook from the session |
| **QR Code** | Get QR code as text for authentication |
| **QR Image** | Get QR code as image for authentication |
| **Delete** | Delete/terminate a session |

### History Resource

| Operation | Description |
|-----------|-------------|
| **Overview** | Get an overview of all chats |
| **Contacts** | Get list of all contacts |
| **Messages** | Get messages from a specific chat |
| **Info** | Get detailed information about a chat |
| **Mark Read** | Mark messages in a chat as read |

### Group Resource

| Operation | Description |
|-----------|-------------|
| **List** | List all groups you're a member of |
| **Create** | Create a new group |
| **Metadata** | Get group metadata/information |
| **Add Participants** | Add participants to a group |
| **Remove Participants** | Remove participants from a group |
| **Promote Participants** | Promote participants to admin |
| **Demote Participants** | Demote admins to regular participants |
| **Update Subject** | Update group name/subject |
| **Update Description** | Update group description |
| **Update Picture** | Update group picture |
| **Leave** | Leave a group |
| **Get Invite Code** | Get group invite code |
| **Revoke Invite** | Revoke and generate new invite code |
| **Update Settings** | Set who can send messages or edit group info |
| **Join** | Join a group using invite code |

## Compatibility

- **n8n version**: 0.5.0 or later
- **Node.js**: 18.10 or later

## Usage Examples

### Example 1: Auto-reply to Messages

1. Add **Chatery WhatsApp Trigger** node with `message` event
2. Add **Chatery WhatsApp** node with **Send Text** operation
3. Connect the trigger to the send node
4. Map the incoming chat ID to the recipient

### Example 2: Send Bulk Notifications

1. Use any trigger (e.g., Webhook, Schedule)
2. Add **Chatery WhatsApp** node
3. Select **Bulk** resource and **Send Bulk Text** operation
4. Enter comma-separated phone numbers and your message
5. Track job status using **Get Job Status** operation

### Example 3: Reply to Specific Message

1. Capture the message ID from incoming webhook
2. Use **Chat** resource with **Send Text** operation
3. Set the `replyTo` parameter with the message ID

### Example 4: Session Management

1. Use **Chatery WhatsApp** node
2. Select **Session** resource
3. Use **Connect** to start a new session
4. Use **QR Image** to get the QR code for scanning
5. Use **Status** to check connection status

## Development

### Build

```bash
npm run build
```

### Lint

```bash
npm run lint
```

### Run Tests

```bash
npm run test
```

## Resources

- [n8n community nodes documentation](https://docs.n8n.io/integrations/community-nodes/)
- [Chatery WhatsApp API](https://github.com/farinchan/chatery_whatsapp)
- [Chatery Documentation](https://docs.chatery.app)

## Author

**Fajri Rinaldi Chan** (Farin Chan)
- Email: fajri@gariskode.com
- GitHub: [@farinchan](https://github.com/farinchan)

## Support

If you find this project helpful, consider supporting the development:

- [Saweria](https://saweria.co/fajrichan)
- [PayPal](https://paypal.me/farinchan)

## License

[MIT](LICENSE.md)
