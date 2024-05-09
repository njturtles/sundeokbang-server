import { Injectable, NotFoundException, Param } from '@nestjs/common';

@Injectable()
export class MockService {
  private users = [
    {
      id_: 1,
      name: '서기문',
      email: 'gimun08@naver.com',
      password: 'scnu20211207',
      phone: '01068603458',
      school: '순천대학교',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id_: 2,
      name: '정다운',
      email: 'ekdns@naver.com',
      password: 'scnu1111',
      phone: '01099578220',
      school: '순천대학교',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ];

  private rooms = [
    {
      id_: 1,
      name: '창조관', //원룸명
      address: '전라남도 순천시 중앙로 255 순천대학교 창조관', //주소
      contracttype: '월세', //거래종류
      deposit: 1000000, //보증금
      cost: 300000, //월세
      term: '1년', //계약기간
      maintenanceCost: 10000, //관리비
      commonArea: '주방', //세대 공동구역
      type: '2인실', //방타입
      exclusiveArea: 16.95, //전용면적
      parking: true, //주차
      heatingSystem: '보일러', //난방방식
      furnitrue: '침대', //가구옵션
      appliances: '전자레인지', //가전옵션
      prevention: 'cctv', //방범옵션
      etc: '와이파이', //기타옵션
      detail: '좋은곳이에요^^ 꼭 들어오세요!!', //상세정보
      phone: '01012341234', //사장번호
      owner: '순천대학교', //등기상 소유자
      latitude: 34.967338, //위도
      longitude: 127.479688, //경도
      imageurl:
        'https://cdn.ggumim.co.kr/cache/star/600/76e8aa01-6ecc-4cef-9122-47cfb38d71dd.jpg',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id_: 2,
      name: '투탑원룸', //원룸명
      address: '전라남도 순천시 순천대3길 13-35', //주소
      contracttype: '월세', //거래종류
      deposit: 2000000, //보증금
      cost: 400000, //월세
      term: '1년', //계약기간
      maintenanceCost: 10000, //관리비
      commonArea: '현관', //세대 공용구역
      type: '1인실', //방타입
      exclusiveArea: 25, //전용면적
      parking: true, //주차
      heatingSystem: '보일러', //난방방식
      furnitrue: '침대,옷장', //가구옵션
      appliances: '전자레인지,TV', //가전옵션
      prevention: 'cctv', //방범옵션
      etc: '와이파이', //기타옵션
      detail: '언제든지 전화주세요!!', //상세정보
      phone: '01011112222', //사장번호
      owner: '홍길동', //등기상 소유자
      latitude: 34.970461, //위도
      longitude: 127.484387, //경도
      imageurl:
        'https://cdn.ggumim.co.kr/cache/star/600/20210616131929cWl6u2N2F1.jpg',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id_: 3,
      name: '트윈스빌', //원룸명
      address: '전라남도 순천시 석현동 217-1', //주소
      contracttype: '월세', //거래종류
      deposit: 1000000, //보증금
      cost: 350000, //월세
      term: '1년', //계약기간
      maintenanceCost: 30000, //관리비
      commonArea: '현관', //세대 공용구역
      type: '1인실', //방타입
      exclusiveArea: 27, //전용면적
      parking: true, //주차
      heatingSystem: '보일러', //난방방식
      furnitrue: '침대,옷장', //가구옵션
      appliances: '전자레인지,TV', //가전옵션
      prevention: 'cctv', //방범옵션
      etc: '와이파이', //기타옵션
      detail: '문의사항은 문자로 주세요~', //상세정보
      phone: '01034345656', //사장번호
      owner: '이순신', //등기상 소유자
      latitude: 34.97152, //위도
      longitude: 127.484045, //경도
      imageurl:
        'https://i0.wp.com/www.gangnamoneroom.com/wp-content/uploads/2023/09/1room.jpg?resize=480%2C360',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id_: 4,
      name: '힐스빌', //원룸명
      address: '전라남도 순천시 석현동 263', //주소
      contracttype: '월세', //거래종류
      deposit: 1000000, //보증금
      cost: 370000, //월세
      term: '1년', //계약기간
      maintenanceCost: 20000, //관리비
      commonArea: '현관', //세대 공용구역
      type: '1인실', //방타입
      exclusiveArea: 30.23, //전용면적
      parking: true, //주차
      heatingSystem: '보일러', //난방방식
      furnitrue: '침대,옷장', //가구옵션
      appliances: '전자레인지,TV', //가전옵션
      prevention: 'cctv', //방범옵션
      etc: '와이파이', //기타옵션
      detail: '오셔서 둘러보세요~~', //상세정보
      phone: '01018187777', //사장번호
      owner: '엄준식', //등기상 소유자
      latitude: 34.9713, //위도
      longitude: 127.477253, //경도
      imageurl:
        'https://static.hyundailivart.co.kr/upload_mall/board/ME00000044/B200044152/tplt/0000218011_20220320223835897.jpg/dims/autorotate/on',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id_: 5,
      name: '에스클래스빌', //원룸명
      address: '전라남도 순천시 북정3길 31-1', //주소
      contracttype: '월세', //거래종류
      deposit: 1000000, //보증금
      cost: 500000, //월세
      term: '1년', //계약기간
      maintenanceCost: 20000, //관리비
      commonArea: '현관', //세대 공용구역
      type: '1인실', //방타입
      exclusiveArea: 25, //전용면적
      parking: true, //주차
      heatingSystem: '보일러', //난방방식
      furnitrue: '침대,옷장', //가구옵션
      appliances: '전자레인지,TV', //가전옵션
      prevention: 'cctv', //방범옵션
      etc: '와이파이', //기타옵션
      detail: '최고의 조건을 갖추고 있어요!!', //상세정보
      phone: '0104318765', //사장번호
      owner: '조용원', //등기상 소유자
      latitude: 34.965131, //위도
      longitude: 127.48246, //경도
      imageurl:
        'https://cf.bstatic.com/xdata/images/hotel/max1024x768/423345232.jpg?k=d52e61c4a9ff4d4b1bbf016007233d26723c954b8d2188a77e18ff80ca219c91&o=&hp=1',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ];

  private favorites = [];

  //유저조회
  async listUsers(
    page: number,
    size: number,
  ): Promise<{ rows: any[]; count: number }> {
    const startIndex = (page - 1) * size;
    const endIndex = startIndex + size;
    const rows = this.users.slice(startIndex, endIndex);
    return { rows, count: this.users.length };
  }

  //원룸조회
  async listRooms(
    page: number,
    size: number,
  ): Promise<{ rows: any[]; count: number }> {
    const startIndex = (page - 1) * size;
    const endIndex = startIndex + size;
    const rows = this.rooms.slice(startIndex, endIndex);
    return { rows, count: this.rooms.length };
  }

  //특정원룸 정보
  async getRoomById(id: number): Promise<{
    id: number;
    name: string;
    deposit: number;
    cost: number;
    latitude: number;
    longitude: number;
  } | null> {
    const room = this.rooms.find((room) => room.id_ === id);
    if (room) {
      return {
        id: room.id_,
        name: room.name,
        deposit: room.deposit,
        cost: room.cost,
        latitude: room.latitude,
        longitude: room.longitude,
      };
    }
    return null;
  }

  // 회원정보 수정
  async updateUser(id: number, userData: Partial<any>): Promise<any> {
    const userIndex = this.users.findIndex((user) => user.id_ === id);
    if (userIndex === -1) {
      throw new Error(`User with ID ${id} not found`);
    }
    this.users[userIndex] = {
      ...this.users[userIndex],
      ...userData,
      updatedAt: new Date(),
    };
    return this.users[userIndex];
  }

  //회원가입
  async createUser(userData: any): Promise<any> {
    const newUserId = this.users.length + 1;

    const newUser = {
      id: newUserId,
      ...userData,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    this.users.push(newUser);

    return newUser;
  }

  //즐겨찾기 생성
  async addFavorite(userId: number, roomId: number): Promise<void> {
    const existingFavorite = this.favorites.find(
      (fav) => fav.userId === userId && fav.roomId === roomId,
    );

    if (!existingFavorite) {
      this.favorites.push({ userId, roomId });
    }
  }

  //즐겨찾기 제거
  async removeFavorite(userId: number, roomId: number): Promise<void> {
    this.favorites = this.favorites.filter(
      (fav) => fav.userId !== userId || fav.roomId !== roomId,
    );
  }

  //특정유저의 즐겨찾기 조회
  async getFavorite(userId: number): Promise<number[]> {
    return this.favorites
      .filter((fav) => fav.userId === userId)
      .map((fav) => fav.roomId);
  }
}
