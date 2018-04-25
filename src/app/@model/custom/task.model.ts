/**
 *
 *
 * @export
 * @class TaskModel
 */
export class TaskModel {
  /**
   *
   *
   * @type {number}
   * @memberof TaskModel
   */
  public pId: number;

  /**
   *
   *
   * @type {string}
   * @memberof TaskModel
   */
  public pName: string;
  /**
   * 
   * 
   * @type {Date}
   * @memberof TaskModel
   */
  public pStart: Date;
  /**
   * 
   * 
   * @type {Date}
   * @memberof TaskModel
   */
  public pEnd: Date;

  /**
   * 
   * 
   * @type {string}
   * @memberof TaskModel
   */
  public pStyle: string;

  /**
   * 
   * 
   * @type {string}
   * @memberof TaskModel
   */
  public pLink: string;

  /**
   * 
   * 
   * @type {number}
   * @memberof TaskModel
   */
  public pMile: number;

  /**
   * 
   * 
   * @type {string}
   * @memberof TaskModel
   */
  public pRes: string;

  /**
   * 
   * 
   * @type {number}
   * @memberof TaskModel
   */
  public pComp: number;

  /**
   * 
   * 
   * @type {number}
   * @memberof TaskModel
   */
  public pGroup: number;

  /**
   * 
   * 
   * @type {number}
   * @memberof TaskModel
   */
  public pParent: number;

  /**
   * 
   * 
   * @type {number}
   * @memberof TaskModel
   */
  public pOpen: number;
  
  /**
   * 
   * 
   * @type {number}
   * @memberof TaskModel
   */
  public pDepend: number;

  /**
   * 
   * 
   * @type {string}
   * @memberof TaskModel
   */
  public pCaption: string;
  
  /**
   * 
   * 
   * @type {string}
   * @memberof TaskModel
   */
  public pNotes: string;

  /**
   * 
   * 
   * @type {*}
   * @memberof TaskModel
   */
  public pGantt: any;
}
