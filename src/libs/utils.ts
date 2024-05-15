export const prune = (obj: any) => {
    if (!obj) return {};

    const result = { ...obj };
    Object.keys(result).forEach(
        (key) =>
            (result[key] === undefined || result[key] === null) &&
            delete result[key],
    );
    return result;
};

export const CalculatorUtil = {
    // 두 점 사이의 거리를 계산하는 함수
    calculateDistance(
        latitude1: number,
        longitude1: number,
        latitude2: number,
        longitude2: number,
    ): number {
        const R = 6371; // 지구 반경
        const dLat = this.deg2rad(latitude2 - latitude1);
        const dLon = this.deg2rad(longitude2 - longitude1);
        const middleAngle =
            Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(this.deg2rad(latitude1)) *
                Math.cos(this.deg2rad(latitude2)) *
                Math.sin(dLon / 2) *
                Math.sin(dLon / 2);
        const straightDistance =
            2 * Math.atan2(Math.sqrt(middleAngle), Math.sqrt(1 - middleAngle));
        return R * straightDistance; // 거리
    },

    // 도 단위를 라디안 단위로 변환하는 함수
    deg2rad(deg: number): number {
        return deg * (Math.PI / 180);
    },
};
