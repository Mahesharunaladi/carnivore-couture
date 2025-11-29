#!/usr/bin/env node

/**
 * Clear All Data from MongoDB
 * This script will delete all users and orders from the carnivore-couture database
 */

const mongoose = require('mongoose');
require('dotenv').config();

const clearAllData = async () => {
  try {
    console.log('🔌 Connecting to MongoDB...');
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB\n');

    // Define models
    const User = mongoose.model('User', new mongoose.Schema({}, { strict: false }));
    const Order = mongoose.model('Order', new mongoose.Schema({}, { strict: false }));

    // Count documents before deletion
    const userCount = await User.countDocuments();
    const orderCount = await Order.countDocuments();

    console.log('📊 Current Database Status:');
    console.log(`   • Users: ${userCount}`);
    console.log(`   • Orders: ${orderCount}\n`);

    if (userCount === 0 && orderCount === 0) {
      console.log('✅ Database is already empty. Nothing to delete.');
      await mongoose.connection.close();
      return;
    }

    // Show users
    if (userCount > 0) {
      const users = await User.find({}, 'name email createdAt');
      console.log('👥 Current Users:');
      users.forEach((user, index) => {
        console.log(`   ${index + 1}. ${user.name} (${user.email})`);
      });
      console.log('');
    }

    // Show orders
    if (orderCount > 0) {
      const orders = await Order.find({}, 'total createdAt');
      console.log('📦 Current Orders:');
      orders.forEach((order, index) => {
        console.log(`   ${index + 1}. Order total: ₹${order.total} - Date: ${order.createdAt}`);
      });
      console.log('');
    }

    // Delete all users
    if (userCount > 0) {
      console.log('🗑️  Deleting all users...');
      const userResult = await User.deleteMany({});
      console.log(`✅ Deleted ${userResult.deletedCount} user(s)`);
    }

    // Delete all orders
    if (orderCount > 0) {
      console.log('🗑️  Deleting all orders...');
      const orderResult = await Order.deleteMany({});
      console.log(`✅ Deleted ${orderResult.deletedCount} order(s)`);
    }

    console.log('');

    // Verify deletion
    const finalUserCount = await User.countDocuments();
    const finalOrderCount = await Order.countDocuments();

    console.log('📊 Final Database Status:');
    console.log(`   • Users: ${finalUserCount}`);
    console.log(`   • Orders: ${finalOrderCount}\n`);

    if (finalUserCount === 0 && finalOrderCount === 0) {
      console.log('✅ All data has been cleared successfully!\n');
      console.log('🎉 Database is now clean. You can register fresh users.\n');
    } else {
      console.log('⚠️  Warning: Some data may still remain in database.\n');
    }

    await mongoose.connection.close();
    console.log('🔌 Disconnected from MongoDB');

  } catch (error) {
    console.error('❌ Error:', error.message);
    console.error(error);
    process.exit(1);
  }
};

// Run the script
console.log('╔═══════════════════════════════════════════════════════════╗');
console.log('║  CLEAR ALL DATA - Carnivore Couture                      ║');
console.log('║  This will delete ALL users and orders!                  ║');
console.log('╚═══════════════════════════════════════════════════════════╝\n');

clearAllData();
