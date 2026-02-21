export type ShipmentStatus = 'Pending' | 'In Transit' | 'Out for Delivery' | 'Delivered' | 'Held';

export interface Shipment {
    id: string;
    tracking_number: string;
    sender_name?: string;
    recipient_name?: string;
    origin?: string;
    destination?: string;
    current_status: ShipmentStatus;
    weight?: number;
    dimensions?: string;
    created_at: string;
    updated_at: string;
}

export interface ShipmentUpdate {
    id: string;
    shipment_id: string;
    status: string;
    location?: string;
    description?: string;
    created_at: string;
}
