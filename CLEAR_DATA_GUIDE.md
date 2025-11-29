# Clear All Registered Users - Quick Guide

## Option 1: Use the Node.js Script (Recommended)

```bash
cd /Users/mahesharunaladi/Downloads/carnivore-couture/backend
node clear-all-data.js
```

This will:
- Show all current users and orders
- Delete everything
- Confirm deletion

## Option 2: Use MongoDB Shell (mongosh)

### Clear Users Only
```bash
mongosh
use carnivore-couture
db.users.deleteMany({})
db.users.countDocuments()  # Should show 0
exit
```

### Clear Users and Orders
```bash
mongosh
use carnivore-couture
db.users.deleteMany({})
db.orders.deleteMany({})
db.users.countDocuments()   # Should show 0
db.orders.countDocuments()  # Should show 0
exit
```

## Option 3: View Then Delete Specific Users

### View all users first
```bash
mongosh
use carnivore-couture
db.users.find().pretty()
```

### Delete specific user by email
```bash
db.users.deleteOne({email: "mahesharunaladi@gmail.com"})
```

### Delete all users
```bash
db.users.deleteMany({})
```

## Quick Commands

### See all users
```bash
mongosh carnivore-couture --eval "db.users.find({}, {name: 1, email: 1}).pretty()"
```

### Count users
```bash
mongosh carnivore-couture --eval "db.users.countDocuments()"
```

### Delete all users (one-liner)
```bash
mongosh carnivore-couture --eval "db.users.deleteMany({})"
```

### Delete all data (users + orders)
```bash
mongosh carnivore-couture --eval "db.users.deleteMany({}); db.orders.deleteMany({})"
```

## After Clearing

Once you clear the data:
1. You can register with the same email again
2. No old data will interfere
3. Fresh start for testing
4. All previous passwords are gone

## Verify It Worked

```bash
mongosh carnivore-couture --eval "print('Users: ' + db.users.countDocuments()); print('Orders: ' + db.orders.countDocuments())"
```

Should show:
```
Users: 0
Orders: 0
```

## Now You Can:

✅ Register with mahesharunaladi@gmail.com again
✅ Test email functionality with fresh accounts
✅ Start clean for development
✅ No duplicate key errors

## Example: Complete Reset

```bash
# Clear all data
mongosh carnivore-couture --eval "db.users.deleteMany({}); db.orders.deleteMany({})"

# Verify it's empty
mongosh carnivore-couture --eval "print('Users: ' + db.users.countDocuments())"

# Now register fresh!
```
