export interface TicketRequest {
  id: number;
  visitor: string;
  packetType: string;
  number: number;
  groupDiscount: number;
  promoCode: string;
  promoDiscount: number;
  price: number;
  finalPrice: number;
  viewed: boolean;
  approved: boolean;
}
