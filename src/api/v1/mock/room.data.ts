export const rooms = [
    {
        _id: 1,
        name: '창조관', //원룸명
        address: '전라남도 순천시 중앙로 255 순천대학교 창조관', //주소
        university_name: '순천대학교', //대학교
        latitude: 34.967338, //위도
        longitude: 127.479688, //경도
        contracttype: '월세', //거래종류
        deposit: 100000, //보증금
        cost: 300000, //월세
        term: '1년', //계약기간
        maintenanceCost: 10000, //관리비
        commonArea: '주방', //세대 공동구역
        type: '2인실', //방타입
        exclusiveArea: 16.95, //전용면적
        parking: true, //주차
        heatingSystem: '보일러', //난방방식
        furniture: '침대', //가구옵션
        appliances: '전자레인지', //가전옵션
        prevention: 'cctv', //방범옵션
        etc: '와이파이', //기타옵션
        detail: '좋은곳이에요^^ 꼭 들어오세요!!', //상세정보
        phone: '01012341234', //사장번호
        owner: '순천대학교', //등기상 소유자
        imageUrls: [
            'https://sundeokbang-bucket.s3.ap-northeast-2.amazonaws.com/images/%E1%84%8E%E1%85%A1%E1%86%BC%E1%84%8C%E1%85%A91.jpeg',
            'https://sundeokbang-bucket.s3.ap-northeast-2.amazonaws.com/images/%E1%84%8E%E1%85%A1%E1%86%BC%E1%84%8C%E1%85%A92.webp',
            'https://sundeokbang-bucket.s3.ap-northeast-2.amazonaws.com/images/%E1%84%8E%E1%85%A1%E1%86%BC%E1%84%8C%E1%85%A93.avif',
        ],
        createdAt: new Date(),
        updatedAt: new Date(),
    },
    {
        _id: 2,
        name: '투탑원룸', //원룸명
        address: '전라남도 순천시 순천대3길 13-35', //주소
        university_name: '순천대학교', //대학교
        latitude: 34.970461, //위도
        longitude: 127.484387, //경도
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
        furniture: '침대,옷장', //가구옵션
        appliances: '전자레인지,TV', //가전옵션
        prevention: 'cctv', //방범옵션
        etc: '와이파이', //기타옵션
        detail: '언제든지 전화주세요!!', //상세정보
        phone: '01011112222', //사장번호
        owner: '홍길동', //등기상 소유자
        imageUrls: [
            'https://sundeokbang-bucket.s3.ap-northeast-2.amazonaws.com/images/%E1%84%90%E1%85%AE%E1%84%90%E1%85%A1%E1%86%B81.jpeg',
            'https://sundeokbang-bucket.s3.ap-northeast-2.amazonaws.com/images/%E1%84%90%E1%85%AE%E1%84%90%E1%85%A1%E1%86%B82.jpeg',
            'https://sundeokbang-bucket.s3.ap-northeast-2.amazonaws.com/images/%E1%84%90%E1%85%AE%E1%84%90%E1%85%A1%E1%86%B83.jpg',
        ],
        createdAt: new Date(),
        updatedAt: new Date(),
    },
    {
        _id: 3,
        name: '트윈스빌', //원룸명
        address: '전라남도 순천시 석현동 217-1', //주소
        university_name: '순천대학교', //대학교
        latitude: 34.97152, //위도
        longitude: 127.484045, //경도
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
        furniture: '침대,옷장', //가구옵션
        appliances: '전자레인지,TV', //가전옵션
        prevention: 'cctv', //방범옵션
        etc: '와이파이', //기타옵션
        detail: '문의사항은 문자로 주세요~', //상세정보
        phone: '01034345656', //사장번호
        owner: '이순신', //등기상 소유자
        imageUrls: [
            'https://sundeokbang-bucket.s3.ap-northeast-2.amazonaws.com/images/%E1%84%90%E1%85%B3%E1%84%8B%E1%85%B1%E1%86%AB%E1%84%89%E1%85%B31.webp',
            'https://sundeokbang-bucket.s3.ap-northeast-2.amazonaws.com/images/%E1%84%90%E1%85%B3%E1%84%8B%E1%85%B1%E1%86%AB%E1%84%89%E1%85%B32.jpeg',
            'https://sundeokbang-bucket.s3.ap-northeast-2.amazonaws.com/images/%E1%84%90%E1%85%B3%E1%84%8B%E1%85%B1%E1%86%AB%E1%84%89%E1%85%B33.jpeg',
        ],
        createdAt: new Date(),
        updatedAt: new Date(),
    },
    {
        _id: 4,
        name: '힐스빌', //원룸명
        address: '전라남도 순천시 석현동 263', //주소
        university_name: '순천대학교', //대학교
        latitude: 34.9713, //위도
        longitude: 127.477253, //경도
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
        furniture: '침대,옷장', //가구옵션
        appliances: '전자레인지,TV', //가전옵션
        prevention: 'cctv', //방범옵션
        etc: '와이파이', //기타옵션
        detail: '오셔서 둘러보세요~~', //상세정보
        phone: '01018187777', //사장번호
        owner: '엄준식', //등기상 소유
        imageUrls: [
            'https://sundeokbang-bucket.s3.ap-northeast-2.amazonaws.com/images/%E1%84%92%E1%85%B5%E1%86%AF%E1%84%89%E1%85%B31.jpeg',
            'https://sundeokbang-bucket.s3.ap-northeast-2.amazonaws.com/images/%E1%84%92%E1%85%B5%E1%86%AF%E1%84%89%E1%85%B32.jpeg',
            'https://sundeokbang-bucket.s3.ap-northeast-2.amazonaws.com/images/%E1%84%92%E1%85%B5%E1%86%AF%E1%84%89%E1%85%B33.jpg',
        ],
        createdAt: new Date(),
        updatedAt: new Date(),
    },
    {
        _id: 5,
        name: '에스클래스빌', //원룸명
        address: '전라남도 순천시 북정3길 31-1', //주소asdfasdf
        university_name: '순천대학교', //대학교
        latitude: 34.965131, //위도
        longitude: 127.48246, //경도
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
        furniture: '침대,옷장', //가구옵션
        appliances: '전자레인지,TV', //가전옵션
        prevention: 'cctv', //방범옵션
        etc: '와이파이', //기타옵션
        detail: '최고의 조건을 갖추고 있어요!!', //상세정보
        phone: '0104318765', //사장번호
        owner: '조용원', //등기상 소유자
        imageUrls: [
            'https://sundeokbang-bucket.s3.ap-northeast-2.amazonaws.com/images/%E1%84%8B%E1%85%A6%E1%84%89%E1%85%B3.jpeg',
            'https://sundeokbang-bucket.s3.ap-northeast-2.amazonaws.com/images/%E1%84%8B%E1%85%A6%E1%84%89%E1%85%B32.jpeg',
            'https://sundeokbang-bucket.s3.ap-northeast-2.amazonaws.com/images/%E1%84%8B%E1%85%A6%E1%84%89%E1%85%B33.jpeg',
        ],
        createdAt: new Date(),
        updatedAt: new Date(),
    },
];
