describe('main.js', function() {
  describe('calculate()', function() {
    it('validates expression when the first number is invalid', ()=>{
      spyOn(window, 'updateResult').and.stub();

      calculate('a+3');

      expect(window.updateResult).toHaveBeenCalled();
      expect(window.updateResult).toHaveBeenCalledWith('Expression not recognized');
      expect(window.updateResult).toHaveBeenCalledTimes(1);
    });

    it('validates expression when the second number is invalid', ()=>{
      spyOn(window, 'updateResult'); //and.stub() is the default, can be omitted

      calculate('3+a');

      expect(window.updateResult).toHaveBeenCalled();
      expect(window.updateResult).toHaveBeenCalledWith('Expression not recognized'); 
      expect(window.updateResult).toHaveBeenCalledTimes(1);
    });

    it('validates expression when the operation is invalid', ()=>{
      spyOn(window, 'updateResult');

      calculate('a,3');

      expect(window.updateResult).toHaveBeenCalled();
      expect(window.updateResult).toHaveBeenCalledWith('Expression not recognized');
      expect(window.updateResult).toHaveBeenCalledTimes(1);
    });

    it('calls add', ()=>{
      const addSpy = spyOn(Calculator.prototype, 'add');

      calculate('3+4');

      expect(addSpy).toHaveBeenCalledTimes(2);
      expect(addSpy).toHaveBeenCalledWith(3);
      expect(addSpy).toHaveBeenCalledWith(4);
    });

    it('calls subtract', ()=>{
      const spy = spyOn(Calculator.prototype, 'subtract');

      calculate('3-7');

      expect(spy).toHaveBeenCalled();
      expect(spy).toHaveBeenCalledWith(7);
    });

    it('calls multiply', ()=>{
      const spy = spyOn(Calculator.prototype, 'multiply');

      calculate('2*6');

      expect(spy).toHaveBeenCalled();
      expect(spy).toHaveBeenCalledWith(6);
    });

    it('calls divide', ()=>{
      const spy = spyOn(Calculator.prototype, 'divide');

      calculate('6/3');

      expect(spy).toHaveBeenCalled();
      expect(spy).toHaveBeenCalledWith(3);
      expect(spy).not.toHaveBeenCalledWith(0);
    });

    //este callThrough ayuda a llamar la verdadera implementación del método siendo espiado
    //en este caso un test de una implementación de un método real SIN el and.callThrough
    //puede dar como resultado un failed spec porque el item en este caso no es 25 sino undefined
    it('calls updateResult (example using and.callThrough', ()=>{
      spyOn(window, 'updateResult');
      spyOn(Calculator.prototype, 'multiply').and.callThrough();

      calculate('5*5');

      expect(window.updateResult).toHaveBeenCalled();
      expect(window.updateResult).toHaveBeenCalledWith(25);
    });

    //este callFake ayuda a llamar una implementación personalizada cuando testeamos un método
    //sólo es usado en casos especiales
    it('calls updateResult (example using and.callFake', ()=>{
      spyOn(window, 'updateResult');
      spyOn(Calculator.prototype, 'multiply').and.callFake(number=>{
        return 'it works';
      });

      calculate('5*5');

      expect(window.updateResult).toHaveBeenCalled();
      expect(window.updateResult).toHaveBeenCalledWith('it works');
    });

    //el returnValue ayuda a llamar una implementación personalizada cuando testeamos un método
    //y necesitamos probar un caso especial y que se este realizando alguna acción específica
    // es decir cuando se desea probar un comportamiento específico
    it('calls updateResult (example using and.returnValue', ()=>{
      spyOn(window, 'updateResult');
      spyOn(Calculator.prototype, 'multiply').and.returnValue('whatever [multiply] returns');

      calculate('5*5');

      expect(window.updateResult).toHaveBeenCalled();
      expect(window.updateResult).toHaveBeenCalledWith('whatever [multiply] returns');
    });

    //el returnValues ayuda a testear un método que es llamado múltiples veces y se quiere testear
    //todos esos casos 
    it('calls updateResult (example using and.returnValues', ()=>{
      spyOn(window, 'updateResult');
      spyOn(Calculator.prototype, 'add').and.returnValues(null, 'whatever [add] returns');

      calculate('5+5');

      expect(window.updateResult).toHaveBeenCalled();
      expect(window.updateResult).toHaveBeenCalledWith('whatever [add] returns');
    });

    //el throwError ayuda a testear casos donde yo indico que el método falla
    it('does not handle errors', ()=>{
      spyOn(Calculator.prototype, 'subtract').and.throwError('some error');

      expect(()=>calculate('5-5')).toThrowError('some error')

    });

    //Spying Setters and Getters
    
  });

  describe('updateResult()', function() {
    beforeAll(function() {
      // Executed ONCE before all specs inside this suite are executed.
      const element = document.createElement('div');
      element.setAttribute('id', 'result');
      document.body.appendChild(element);

      this.element = element;
    });

    afterAll(function() {
      // Executed ONCE after all specs inside this describe are executed.
      document.body.removeChild(this.element);
    });

    it('adds result to DOM element', function() {
      updateResult('5');

      expect(this.element.innerText).toBe('5');
    });
  });
});
