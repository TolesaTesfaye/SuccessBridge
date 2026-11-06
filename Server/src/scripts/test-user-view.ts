/**
 * Debug script to test user view query
 * Run with: npx tsx src/scripts/test-user-view.ts <userId>
 */

import { User, SubjectAccess, Subject } from '../models/index.js';
import { setupAssociations } from '../models/index.js';
import { sequelize } from '../config/database.js';

async function testUserView(userId: string) {
  try {
    console.log('🔍 Testing user view for ID:', userId);
    console.log('─────────────────────────────────────\n');

    // Ensure associations are set up
    setupAssociations();

    // Test 1: Basic user fetch
    console.log('Test 1: Fetching user without associations...');
    const user = await User.findByPk(userId);
    
    if (!user) {
      console.error('❌ User not found with ID:', userId);
      return;
    }
    
    console.log('✅ User found:', {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    });
    console.log('');

    // Test 2: Fetch with subjectAccess using original approach
    console.log('Test 2: Fetching with subjectAccess (nested include)...');
    try {
      const userWithAccess: any = await User.findByPk(userId, {
        include: [
          {
            model: SubjectAccess,
            as: 'subjectAccess',
            include: [{ model: Subject, as: 'subject', attributes: ['name', 'code'] }],
          },
        ],
      });

      if (userWithAccess) {
        console.log('✅ Success! Subject access count:', userWithAccess.subjectAccess?.length || 0);
        if (userWithAccess.subjectAccess && userWithAccess.subjectAccess.length > 0) {
          console.log('Subjects:', userWithAccess.subjectAccess.map((sa: any) => sa.subject?.name));
        }
      }
    } catch (error: any) {
      console.error('❌ Failed with nested include approach');
      console.error('Error:', error.message);
      console.error('Error name:', error.name);
      if (error.original) {
        console.error('Original error:', error.original.message);
      }
    }
    console.log('');

    // Test 3: Fetch subjectAccess separately
    console.log('Test 3: Fetching subjectAccess separately...');
    try {
      const subjectAccesses = await SubjectAccess.findAll({
        where: { userId },
        include: [{ 
          model: Subject, 
          as: 'subject', 
          attributes: ['name', 'code'],
          required: false
        }],
      });

      console.log('✅ Success! Found', subjectAccesses.length, 'subject access records');
      subjectAccesses.forEach((sa: any) => {
        console.log(`  • ${sa.subject?.name || 'Unknown'} (${sa.subject?.code || 'N/A'})`);
      });
    } catch (error: any) {
      console.error('❌ Failed with separate query');
      console.error('Error:', error.message);
    }
    console.log('');

    // Test 4: Check association configuration
    console.log('Test 4: Checking association configuration...');
    const associations = User.associations;
    console.log('User model associations:', Object.keys(associations));
    
    if (associations.subjectAccess) {
      console.log('✅ subjectAccess association exists');
      console.log('   Type:', associations.subjectAccess.associationType);
      console.log('   Target:', associations.subjectAccess.target.name);
    } else {
      console.error('❌ subjectAccess association not found!');
    }
    console.log('');

    console.log('─────────────────────────────────────');
    console.log('✅ Testing complete');
    
  } catch (error: any) {
    console.error('❌ Fatal error during testing:', error);
    console.error('Stack:', error.stack);
  } finally {
    await sequelize.close();
  }
}

// Get userId from command line
const userId = process.argv[2];

if (!userId) {
  console.error('Usage: npx tsx src/scripts/test-user-view.ts <userId>');
  console.error('Example: npx tsx src/scripts/test-user-view.ts 123e4567-e89b-12d3-a456-426614174000');
  process.exit(1);
}

testUserView(userId).catch(console.error);
