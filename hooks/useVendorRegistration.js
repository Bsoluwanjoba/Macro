import { useState } from 'react';

export function useVendorRegistration() {
    const [vendor, setVendor] = useState(null);

    const registerVendor = (vendorData) => {
        // Logic to register vendor
        setVendor(vendorData);
    };

    return { vendor, registerVendor };
}
