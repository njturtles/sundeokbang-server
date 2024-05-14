export class CalculatorUtil {
    // 두 점 사이의 거리를 계산하는 함수 (위도, 경도 기반)
    calculateDistance(
        latitude1: number,
        longitude1: number,
        latitude2: number,
        longitude2: number,
    ): number {
        const R = 6371; // 지구 반경 (킬로미터)
        const dLat = this.deg2rad(latitude2 - latitude1);
        const dLon = this.deg2rad(longitude2 - longitude1);
        const a =
            Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(this.deg2rad(latitude1)) *
                Math.cos(this.deg2rad(latitude2)) *
                Math.sin(dLon / 2) *
                Math.sin(dLon / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        return R * c; // 거리 (킬로미터)
    }

    // 도 단위를 라디안 단위로 변환하는 함수
    deg2rad(deg: number): number {
        return deg * (Math.PI / 180);
    }
}
