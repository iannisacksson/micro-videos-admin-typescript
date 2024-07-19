import { InvalidUuidError, Uuid } from "../uuid.vo";

describe('Uuid Unit Test', () => {
    const validateSpy = jest.spyOn(Uuid.prototype as any, 'validate');
    test('Should throw error when uuid is invalid', () => {
        expect(() => {
            new Uuid("invalid-uuid");
        }).toThrow(new InvalidUuidError());
        expect(validateSpy).toHaveBeenCalledTimes(1);
    });
    test('Should create a valid uuid', () => {
        const uuid = new Uuid();
        expect(uuid.id).toBeDefined();
        expect(validateSpy).toHaveBeenCalledTimes(1);
    });
    test('Should accept a valid uuid', () => {
        const uuid = new Uuid("3b8c4f2c-aff9-4399-a72a-ad879e5689a2");
        expect(uuid.id).toBe("3b8c4f2c-aff9-4399-a72a-ad879e5689a2");
        expect(validateSpy).toHaveBeenCalledTimes(1);
    });
})