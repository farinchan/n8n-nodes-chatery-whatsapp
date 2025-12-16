# n8n-nodes-chatery-whatsapp

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
| `message` | New incoming message |
| `message_ack` | Message acknowledgment (sent, delivered, read) |
| `message_revoke` | Message deleted/revoked |
| `presence` | Contact presence update (online, typing, etc.) |
| `qr` | QR code generated for authentication |
| `ready` | Session is ready and connected |
| `disconnected` | Session disconnected |
| `group_update` | Group information updated |
| `group_participants` | Group participants changed |

**Options:**
- **Session Filter**: Filter events by specific session ID
- **Chat ID Filter**: Filter events by specific chat ID
- **Ignore Status**: Ignore status/story updates
- **Only From Me**: Only receive messages sent by you
- **Only From Others**: Only receive messages from others

### Chatery WhatsApp

The main node for performing WhatsApp operations via HTTP requests.

## Resources & Operations

### Chat Resource

| Operation | Description |
|-----------|-------------|
| **Send Text** | Send a text message to a chat |
| **Send Image** | Send an image with optional caption |
| **Send Document** | Send a document/file |
| **Send Location** | Send a location with coordinates |
| **Send Contact** | Send a contact card |
| **Send Button** | Send a message with buttons |
| **Send Presence Update** | Update your presence status |
| **Check Number** | Check if a number is registered on WhatsApp |
| **Profile Picture** | Get a contact's profile picture URL |
| **Contact Info** | Get detailed information about a contact |

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
| **Leave** | Leave a group |
| **Invite Code** | Get group invite code |
| **Revoke Invite Code** | Revoke and generate new invite code |
| **Set Who Can Send Message** | Set who can send messages (all/admins only) |
| **Set Who Can Edit Group** | Set who can edit group info |
| **Accept Invite** | Join a group using invite code |

## Compatibility

- **n8n version**: 0.5.0 or later
- **Node.js**: 18.10 or later

## Usage Examples

### Example 1: Auto-reply to Messages

1. Add **Chatery WhatsApp Trigger** node with `message` event
2. Add **Chatery WhatsApp** node with **Send Text** operation
3. Connect the trigger to the send node
4. Map the incoming chat ID to the recipient

### Example 2: Send Notification to Group

1. Use any trigger (e.g., Webhook, Schedule)
2. Add **Chatery WhatsApp** node
3. Select **Chat** resource and **Send Text** operation
4. Enter your group ID and message

### Example 3: Session Management

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
- [Chatery WhatsApp API Documentation](https://github.com/AhmadShahid/chatery)

## Author

**Dajri Rinaldi Chan**
- Email: fajri@gariskode.com
- GitHub: [@farinchan](https://github.com/farinchan)

## License

[MIT](LICENSE.md)
