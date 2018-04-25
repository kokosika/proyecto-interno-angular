/**
 * 
 * 
 * @export
 * @class TareaNoProgramada
 */
export class TareaNoProgramada {

	/**
	 * 
	 * 
	 * @type {number}
	 * @memberof TareaNoProgramada
	 */
	public idTareaNoAsignada: number;

	/**
	 * 
	 * 
	 * @type {number}
	 * @memberof TareaNoProgramada
	 */
	public usuarioReceptor : number;

	/**
	 * 
	 * 
	 * @type {number}
	 * @memberof TareaNoProgramada
	 */
	public usuarioEnviante : number;
	
	/**
	 * 
	 * 
	 * @type {string}
	 * @memberof TareaNoProgramada
	 */
	public mensaje : string;

	/**
	 * 
	 * 
	 * @type {string}
	 * @memberof TareaNoProgramada
	 */
	public nombreUsuarioEnviante : string;
	
	/**
	 * 
	 * 
	 * @type {Date}
	 * @memberof TareaNoProgramada
	 */
	public fechaTermino: Date;

	/**
	 * 
	 * 
	 * @type {Date}
	 * @memberof TareaNoProgramada
	 */
	public fechaCreacion: Date;
}