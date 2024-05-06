import { Injectable } from '@nestjs/common';

@Injectable()
export class MockRoomService {
  async list(
    page: number,
    size: number,
  ): Promise<{ rows: any[]; count: number }> {
    const rows = [
      {
        id: 1,
        name: '창조관',
        address: '전라남도 순천시 중앙로 255 순천대학교 창조관',
        contracttype: '월세',
        deposit: 1000000,
        cost: 300000,
        term: '1년',
        maintenanceCost: 10000,
        commonArea: '주방',
        type: '2인실',
        exclusiveArea: 16.95,
        parking: true,
        heatingSystem: '보일러',
        furnitrue: '침대',
        appliances: '전자레인지',
        prevention: 'cctv',
        etc: '와이파이',
        detail: '좋은곳이에요^^ 꼭 들어오세요!!',
        phone: '01012341234',
        owner: '순천대학교',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];
    return { rows, count: rows.length };
  }
}
