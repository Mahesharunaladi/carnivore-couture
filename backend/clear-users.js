#!/usr/bin/env node

/**
 * Clear All User Data from MongoDB
 * This script will delete all users from the carnivore-couture database
 */

const mongoose = require('mongoose');
require('dotenv').config();

const clearAllUsers = async () => {
  try {
    console.log('🔌 Connecting to MongoDB...');
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB\n');

    // Get the User model
    const User = mongoose.model('User', new mongoose.Schema({}, { strict: false }));

    // Count users before deletion
    const countBefore = await User.countDocuments();
    console.log(`📊 Found ${countBefore} user(s) in database\n`);

    if (countBefore === 0) {
      console.log('✅ No users to delete. Database is already empty.');
      await mongoose.connection.close();
      return;
    }

    // List all users before deletion
    const users = await User.find({}, 'name email createdAt');
    console.log('👥 Current users:');
    users.forEach((user, index) => {
      console.log(`   ${index + 1}. ${user.name} (${user.email}) - Registered: ${user.createdAt}`);
    });
    console.log('');

    // Delete all users
    console.log('🗑️  Deleting all users...');
    const result = await User.deleteMany({});
    console.log(`✅ Successfully deleted ${result.deletedCount} user(s)\n`);

    // Verify deletion
    const countAfter = await User.countDocuments();
    console.log(`📊 Users remaining: ${countAfter}`);

    if (countAfter === 0) {
      console.log('✅ All user data has been cleared successfully!\n');
      console.log('🎉 You can now register fresh users.\n');
    } else {
      console.log('⚠️  Warning: Some users may still remain in database.\n');
    }

    await mongoose.connection.close();
    console.log('🔌 Disconnected from MongoDB');

  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
};

// Run the script
console.log('╔═══════════════════════════════════════════════════════════╗');
console.log('║  CLEAR ALL USER DATA - Carnivore Couture                 ║');
console.log('╚═══════════════════════════════════════════════════════════╝\n');

clearAllUsers();
