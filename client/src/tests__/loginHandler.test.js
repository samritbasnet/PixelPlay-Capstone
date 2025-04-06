import { loginHandler } from '../logic/logicHandler';

describe('loginHandler',()=>{
    it('calls onLogin if email and password are provided',()=>{
        const mocklogin=vi.fn();
        loginHandler('admin@example.com','password123',mocklogin);

        expect(mocklogin).toHaveBeenCalledTimes(1);
        expect(mocklogin).toHaveBeenCalledWith({
            email:'admin@example.com',
            password:'password123'
        });
    });
    it('does not call onLogin if fields are empty',()=>{
        const mockLogin=vi.fn();
        loginHandler('','',mockLogin);
        expect(mockLogin).not.toHaveBeenCalled();
    })
    
})