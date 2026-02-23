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
    item_type: string;     // What is being shipped
    description: string;   // Full cargo description
    sender_name?: string;
    sender_email?: string;
    recipient_name?: string;
    recipient_address?: string;
    recipient_email?: string;
    recipient_phone?: string;
    origin?: string;
    destination?: string;
    current_status: ShipmentStatus;
    weight?: number;
    dimensions?: string;
    payment_method?: 'Credit Card' | 'Bank Transfer' | 'PayPal' | 'Cash' | 'Chime' | 'Zelle' | 'Apple Pay';
    payment_status?: 'Paid' | 'Pending' | 'Partially Paid';
    estimated_delivery?: string;
    created_at: string;
    updated_at: string;
    is_deleted?: boolean;
    updates: ShipmentUpdate[];
}

export interface ChatRoom {
    id: string;
    customer_name?: string;
    customer_email?: string;
    user_id?: string;
    last_message?: string;
    status: 'active' | 'closed';
    created_at: string;
    updated_at: string;
}

export interface ChatMessage {
    id: string;
    room_id: string;
    sender_role: 'admin' | 'customer';
    content: string;
    created_at: string;
}
