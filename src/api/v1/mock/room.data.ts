export const rooms = [
    {
        _id: 1,
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
        imageurl: [
            'https://cdn.ggumim.co.kr/cache/star/600/76e8aa01-6ecc-4cef-9122-47cfb38d71dd.jpg',
            'https://i.namu.wiki/i/qKxcAi_HHGm1iaFqOWf8mrp5xAPjPDTOkxTtNBy5s6qpFXrL16tWL0SiYD0Z57_tLcd_EycaAerp4WtT-rtn9Q.webp',
            'https://image.ohou.se/i/bucketplace-v2-development/uploads/cards/snapshots/169079532059746276.jpeg?gif=1&w=480&h=480&c=c&q=80&webp=1',
        ],
        createdAt: new Date(),
        updatedAt: new Date(),
    },
    {
        _id: 2,
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
        imageurl: [
            'https://cdn.ggumim.co.kr/cache/star/600/20210616131929cWl6u2N2F1.jpg',
            'https://wimg.mk.co.kr/meet/neds/2021/05/image_readtop_2021_469697_16210535124645890.jpg',
            'https://img.hankyung.com/photo/202201/01.28728932.1.jpg',
        ],
        createdAt: new Date(),
        updatedAt: new Date(),
    },
    {
        _id: 3,
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
        imageurl: [
            'https://i0.wp.com/www.gangnamoneroom.com/wp-content/uploads/2023/09/1room.jpg?resize=480%2C360',
            'https://contents-cdn.viewus.co.kr/image/230131/443dd20c-a1a1-4464-8889-92860bb2a33d.jpeg',
            'https://www.yyg.go.kr/www/citizen_participation/publicity/ybmodule.file/board_www/www_company_pr/1675320106.jpg',
        ],
        createdAt: new Date(),
        updatedAt: new Date(),
    },
    {
        _id: 4,
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
        imageurl: [
            'https://static.hyundailivart.co.kr/upload_mall/board/ME00000044/B200044152/tplt/0000218011_20220320223835897.jpg/dims/autorotate/on',
            'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcScz3bQCkLzBedzXTzVQtW3hLtOGNn8vt95AXAOSYszDg&s',
            'https://dimg.donga.com/wps/NEWS/IMAGE/2021/07/07/107834624.2.jpg',
        ],
        createdAt: new Date(),
        updatedAt: new Date(),
    },
    {
        _id: 5,
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
        imageurl: [
            'https://cf.bstatic.com/xdata/images/hotel/max1024x768/423345232.jpg?k=d52e61c4a9ff4d4b1bbf016007233d26723c954b8d2188a77e18ff80ca219c91&o=&hp=1',
            'https://cdn.jjan.kr/data2/content/image/2022/08/21/.cache/512/20220821580252.jpg',
            'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSMkQUrYMqbJ8Ctvsz4uxsbi-fjL0msmu8vw489jWkhSw&s',
        ],
        createdAt: new Date(),
        updatedAt: new Date(),
    },
];
