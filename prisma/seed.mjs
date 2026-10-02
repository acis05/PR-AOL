import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const db = new PrismaClient();

async function main() {
  const passwordHash = await bcrypt.hash('Admin123!', 10);

  const users = [
    { name: 'Admin', email: 'admin@example.com', role: 'ADMIN', department: 'Management' },
    { name: 'Requester Demo', email: 'requester@example.com', role: 'REQUESTER', department: 'IT' },
    { name: 'Approver Demo', email: 'approver@example.com', role: 'APPROVER', department: 'IT' },
    { name: 'Procurement Demo', email: 'procurement@example.com', role: 'PROCUREMENT', department: 'Procurement' }
  ];

  for (const user of users) {
    await db.user.upsert({
      where: { email: user.email },
      update: {},
      create: { ...user, passwordHash }
    });
  }

  const items = [
    { accurateId: 'demo-1', code: 'ITM-001', name: 'Dell Monitor 24 inch', unit: 'PCS' },
    { accurateId: 'demo-2', code: 'ITM-002', name: 'Logitech Keyboard', unit: 'PCS' },
    { accurateId: 'demo-3', code: 'ITM-003', name: 'Samsung SSD 1TB', unit: 'PCS' }
  ];

  for (const item of items) {
    await db.accurateItem.upsert({
      where: { accurateId: item.accurateId },
      update: {},
      create: item
    });
  }

  console.log('Database seed completed.');
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await db.$disconnect();
  });
