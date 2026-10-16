# Admin Management System - Implementation Guide

## 📁 Structure

```
bot/admin/
├── index.ts                    # Main admin router
├── middleware/
│   ├── auth.ts                # Admin authentication
│   └── permissions.ts         # Role-based permissions
├── modules/
│   ├── users/                 # User management
│   │   ├── list.ts
│   │   ├── view.ts
│   │   ├── edit.ts
│   │   └── access.ts
│   ├── resources/             # Resource management
│   │   ├── upload.ts
│   │   ├── edit.ts
│   │   ├── delete.ts
│   │   └── move.ts
│   ├── subjects/              # Subject management
│   │   ├── create.ts
│   │   ├── edit.ts
│   │   └── delete.ts
│   ├── education/             # Grade/Stream management
│   ├── config/                # Bot configuration
│   ├── analytics/             # Statistics & reports
│   ├── notifications/         # Notification system
│   ├── payments/              # Payment management
│   ├── quizzes/               # Quiz management
│   └── system/                # System maintenance
├── services/
│   ├── fileUpload.ts         # Handle file uploads
│   ├── broadcast.ts          # Send notifications
│   └── backup.ts             # Database backup
├── utils/
│   ├── keyboards.ts          # Admin keyboards
│   ├── formatters.ts         # Message formatters
│   └── validators.ts         # Input validation
└── sessions/
    └── conversationState.ts   # Track multi-step flows
```

## 🎯 Key Features to Implement First

### 1. User Management (Priority 1)
- View all users
- Search by email/name/telegram
- Grant subject access
- Change user role
- View user activity

### 2. Resource Management (Priority 1)
- Upload files via Telegram
- Auto-upload to B2
- Link to subjects
- Set metadata
- Delete resources

### 3. Statistics Dashboard (Priority 2)
- Total users
- Resources per subject
- Popular downloads
- Active users today
- Error summary

### 4. Notification System (Priority 2)
- Broadcast messages
- Target by grade/subject
- Schedule notifications
- Track delivery

### 5. Subject Management (Priority 3)
- Create subjects
- Edit details
- Link to grades/streams
- Set access rules

## 🔧 Implementation Order

### Week 1: Foundation
1. Create admin middleware
2. Build main admin menu
3. Implement user list/view
4. Add basic statistics

### Week 2: Core Features
1. Resource upload system
2. User access management
3. Search functionality
4. Audit logging

### Week 3: Advanced Features
1. Notification broadcasting
2. Subject management
3. Analytics dashboard
4. Payment tracking

### Week 4: Polish
1. Error handling
2. Rate limiting
3. Backup system
4. Documentation

## 📝 Example Implementations

### Admin Menu
```typescript
export async function showAdminMenu(bot: any, chatId: number) {
  const stats = await getQuickStats();
  
  const message = `
🔐 *Admin Panel*

📊 Quick Stats:
• Users: ${stats.totalUsers} (${stats.activeToday} active)
• Subjects: ${stats.totalSubjects}
• Resources: ${stats.totalResources}
• Downloads Today: ${stats.downloadsToday}

Select management area:
  `;

  await bot.sendMessage(chatId, message, {
    parse_mode: 'Markdown',
    reply_markup: {
      inline_keyboard: [
        [
          { text: '👥 Users', callback_data: 'admin_users' },
          { text: '📚 Subjects', callback_data: 'admin_subjects' }
        ],
        [
          { text: '📁 Resources', callback_data: 'admin_resources' },
          { text: '📊 Analytics', callback_data: 'admin_analytics' }
        ],
        [
          { text: '🔔 Notify', callback_data: 'admin_notify' },
          { text: '⚙️ Config', callback_data: 'admin_config' }
        ],
        [
          { text: '🔙 Exit Admin', callback_data: 'main_menu' }
        ]
      ]
    }
  });
}
```

### Resource Upload Flow
```typescript
export async function handleResourceUpload(bot: any, msg: any) {
  // Step 1: Receive file
  if (msg.document) {
    const file = msg.document;
    
    // Save to temp
    const filePath = await bot.downloadFile(file.file_id, './temp/');
    
    // Ask for subject
    await askForSubject(bot, msg.chat.id, filePath);
  }
}

async function askForSubject(bot: any, chatId: number, filePath: string) {
  const subjects = await getRecentSubjects();
  
  const keyboard = subjects.map(s => [{
    text: `${s.name} (${s.code})`,
    callback_data: `upload_subject_${s.id}_${filePath}`
  }]);
  
  keyboard.push([
    { text: '🔍 Search Other', callback_data: 'upload_search' },
    { text: '❌ Cancel', callback_data: 'admin_menu' }
  ]);
  
  await bot.sendMessage(chatId, '📚 Select subject:', {
    reply_markup: { inline_keyboard: keyboard }
  });
}
```

### User Management
```typescript
export async function listUsers(bot: any, chatId: number, page = 1) {
  const users = await User.findAll({
    limit: 10,
    offset: (page - 1) * 10,
    order: [['createdAt', 'DESC']]
  });
  
  const keyboard = users.map(u => [{
    text: `${u.name} (@${u.telegramUsername || 'no username'})`,
    callback_data: `admin_user_view_${u.id}`
  }]);
  
  keyboard.push([
    { text: '⬅️ Prev', callback_data: `admin_users_${page-1}` },
    { text: '➡️ Next', callback_data: `admin_users_${page+1}` }
  ]);
  
  await bot.sendMessage(chatId, 
    `👥 *Users* (Page ${page})\n\nSelect to view details:`, 
    {
      parse_mode: 'Markdown',
      reply_markup: { inline_keyboard: keyboard }
    }
  );
}

export async function viewUser(bot: any, chatId: number, userId: string) {
  const user = await User.findByPk(userId, {
    include: [{ model: SubjectAccess, as: 'subjectAccesses' }]
  });
  
  const message = `
👤 *User Details*

Name: ${user.name}
Email: ${user.email}
Role: ${user.role}
Telegram: @${user.telegramUsername || 'N/A'}
Joined: ${formatDate(user.createdAt)}

📚 Subjects: ${user.subjectAccesses.length}
📊 Status: ${user.isActive ? 'Active' : 'Inactive'}
  `;
  
  await bot.sendMessage(chatId, message, {
    parse_mode: 'Markdown',
    reply_markup: {
      inline_keyboard: [
        [
          { text: '✏️ Edit Role', callback_data: `admin_user_role_${userId}` },
          { text: '🔓 Grant Access', callback_data: `admin_user_access_${userId}` }
        ],
        [
          { text: '🚫 Ban', callback_data: `admin_user_ban_${userId}` },
          { text: '📊 Activity', callback_data: `admin_user_activity_${userId}` }
        ],
        [
          { text: '🔙 Back', callback_data: 'admin_users' }
        ]
      ]
    }
  });
}
```

## 🚀 Ready to Start?

I can implement:
1. **Complete Admin System** (all modules)
2. **Phase 1 Only** (users, resources, stats)
3. **Specific Feature** (tell me which)

Which would you prefer?
