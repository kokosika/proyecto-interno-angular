/**
 *
 *
 * @export
 * @class TareasDragModel
 */
export class TareasDragModel {
  /**
   *
   *
   * @type {string}
   * @memberof TareasDragModel
   */
  public idTarea: string;

  /**
   *
   *
   * @type {number}
   * @memberof TareasDragModel
   */
  public idProyecto: number;

  /**
   *
   *
   * @type {string}
   * @memberof TareasDragModel
   */
  public nombre: string;

  /**
   *
   *
   * @type {number}
   * @memberof TareasDragModel
   */
  public porcentajeReal: number;

  /**
   *
   *
   * @type {number}
   * @memberof TareasDragModel
   */
  public porcentajeEsperado: number;

  /**
   *
   *
   * @type {string}
   * @memberof TareasDragModel
   */
  public fase: string;

  /**
   *
   *
   * @type {number}
   * @memberof TareasDragModel
   */
  public estadoKamban: number;

  /**
   *
   *
   * @type {Date}
   * @memberof TareasDragModel
   */
  public fechaTermino: Date;
}
