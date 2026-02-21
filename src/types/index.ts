export type ShipmentStatus = 'Pending' | 'In Transit' | 'Out for Delivery' | 'Delivered' | 'Held' | 'Postponed';

export interface ShipmentUpdate {
    id: string;
    shipment_id: string;
    status: string;
    location?: string;
    description?: string;
    created_at: string;
}

export interface Shipment {
    id: string;
    tracking_number: string;
    shipment_name: string; // Unique reference name
    item_type: string;     // What is being shipped
    description: string;   // Full cargo description
    sender_name?: string;
    recipient_name?: string;
    origin?: string;
    destination?: string;
    current_status: ShipmentStatus;
    weight?: number;
    dimensions?: string;
    payment_method?: 'Credit Card' | 'Bank Transfer' | 'PayPal' | 'Cash';
    payment_status?: 'Paid' | 'Pending' | 'Partially Paid';
    estimated_delivery?: string;
    created_at: string;
    updated_at: string;
    is_deleted?: boolean;
    updates: ShipmentUpdate[];
}
