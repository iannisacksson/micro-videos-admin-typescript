import { Uuid } from "../../shared/domain/value-object/uuid.vo";
import { Category } from "../category.entity";

describe('Category Unit Tests', () => {
    describe('constructor', () => {
        it('should create a category with only one attribute (Name)', () => {
            const category = new Category({ name: 'Movie' });
            expect(category.category_id).toBeInstanceOf(Uuid);
            expect(category.name).toBe('Movie');
            expect(category.description).toBeNull();
            expect(category.is_active).toBeTruthy();
            expect(category.created_at).toBeInstanceOf(Date);
        });
        
        it('should create a catogory all attributes', () => {
            const created_at = new Date();
            const category = new Category({
                name: 'Movie',
                description: 'Movie descripion',
                is_active: false,
                created_at,
            });
            expect(category.category_id).toBeInstanceOf(Uuid);
            expect(category.name).toBe('Movie');
            expect(category.description).toBe('Movie descripion');
            expect(category.is_active).toBeFalsy();
            expect(category.created_at).toBe(created_at);
        });
      
        it('should create a category with two attributes', () => {
            const category = new Category({
                name: 'Movie',
                description: 'Movie descripion',
            });
            expect(category.category_id).toBeInstanceOf(Uuid);
            expect(category.name).toBe('Movie');
            expect(category.description).toBe('Movie descripion');
            expect(category.is_active).toBeTruthy();
            expect(category.created_at).toBeInstanceOf(Date);
        });
    });

    describe('Command create', () => {
        it('should create a category', () => {
            const category = Category.create({ name: 'Movie' });
            expect(category.category_id).toBeInstanceOf(Uuid);
            expect(category.name).toBe('Movie');
            expect(category.description).toBeNull();
            expect(category.is_active).toBeTruthy();
            expect(category.created_at).toBeInstanceOf(Date);
        });
        
        it('should create a catogory with description', () => {
            const category = Category.create({
                name: 'Movie',
                description: 'Movie descripion',
            });
            expect(category.category_id).toBeInstanceOf(Uuid);
            expect(category.name).toBe('Movie');
            expect(category.description).toBe('Movie descripion');
            expect(category.is_active).toBeTruthy();
            expect(category.created_at).toBeInstanceOf(Date);
        });
        
        it('should create a catogory with is_active', () => {
            const category = Category.create({
                name: 'Movie',
                is_active: false,
            });
            expect(category.category_id).toBeInstanceOf(Uuid);
            expect(category.name).toBe('Movie');
            expect(category.description).toBeNull();
            expect(category.is_active).toBeFalsy();
            expect(category.created_at).toBeInstanceOf(Date);
        });
    });

    describe('Command change', () => {
        it('should change name', () => {
            const category = Category.create({ name: 'Movie' });
            category.changeName('Other movie');
            expect(category.name).toBe('Other movie');
        });

        it('should change description', () => {
            const category = Category.create({
                name: 'Movie',
                description: 'Description movie',
            });
            category.changeDescription('Other description');
            expect(category.description).toBe('Other description');
        });

        it('should active a category', () => {
            const category = Category.create({
                name: 'Movie',
                is_active: false,
            });
            category.activate();
            expect(category.is_active).toBe(true);
        });

        it('should deactive a category', () => {
            const category = Category.create({
                name: 'Movie',
                is_active: true,
            });
            category.deactivate();
            expect(category.is_active).toBe(false);
        });
    });

    describe('category_id field', () => {
        const arrange = [
            { category_id: null },
            { category_id: undefined },
            { category_id: new Uuid() },
        ];
        test.each(arrange)("id = %j", ({ category_id }) => {
            const category = new Category({
                name: 'Movie',
                category_id: category_id as any,
            });
            expect(category.category_id).toBeInstanceOf(Uuid);
            if (category_id instanceof Uuid) {
                expect(category.category_id).toBe(category_id);
            }
        });
    });
});
