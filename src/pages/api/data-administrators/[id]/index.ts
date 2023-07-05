import type { NextApiRequest, NextApiResponse } from 'next';
import { roqClient } from 'server/roq';
import { prisma } from 'server/db';
import { errorHandlerMiddleware } from 'server/middlewares';
import { dataAdministratorValidationSchema } from 'validationSchema/data-administrators';
import { HttpMethod, convertMethodToOperation, convertQueryToPrismaUtil } from 'server/utils';
import { getServerSession } from '@roq/nextjs';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { roqUserId, user } = await getServerSession(req);
  await prisma.data_administrator
    .withAuthorization({
      roqUserId,
      tenantId: user.tenantId,
      roles: user.roles,
    })
    .hasAccess(req.query.id as string, convertMethodToOperation(req.method as HttpMethod));

  switch (req.method) {
    case 'GET':
      return getDataAdministratorById();
    case 'PUT':
      return updateDataAdministratorById();
    case 'DELETE':
      return deleteDataAdministratorById();
    default:
      return res.status(405).json({ message: `Method ${req.method} not allowed` });
  }

  async function getDataAdministratorById() {
    const data = await prisma.data_administrator.findFirst(convertQueryToPrismaUtil(req.query, 'data_administrator'));
    return res.status(200).json(data);
  }

  async function updateDataAdministratorById() {
    await dataAdministratorValidationSchema.validate(req.body);
    const data = await prisma.data_administrator.update({
      where: { id: req.query.id as string },
      data: {
        ...req.body,
      },
    });

    return res.status(200).json(data);
  }
  async function deleteDataAdministratorById() {
    const data = await prisma.data_administrator.delete({
      where: { id: req.query.id as string },
    });
    return res.status(200).json(data);
  }
}

export default function apiHandler(req: NextApiRequest, res: NextApiResponse) {
  return errorHandlerMiddleware(handler)(req, res);
}
