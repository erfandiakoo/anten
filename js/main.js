
const configForm = document.getElementById('config-form');

function generateUniqueUUID() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

function handleFormSubmit(event) {
    event.preventDefault();

    // Collect form data
    const apn = document.getElementById('apn').value;

    // Create the XML-formatted plist string
    const configPlist = `<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
<key>PayloadContent</key>
<array>
<!-- Cellular Settings -->
<dict>
    <key>PayloadDisplayName</key>
    <string>Cellular</string>
    <key>PayloadIdentifier</key>
    <string>com.apple.cellular</string>
    <key>PayloadType</key>
    <string>com.apple.cellular</string>
    <key>PayloadUUID</key>
    <string>${generateUniqueUUID()}</string>
    <key>PayloadVersion</key>
    <integer>1</integer>
    <key>APNs</key>
    <array>
    
        <!-- First APN -->
        <dict>
            <key>AllowedProtocolMask</key>
            <integer>3</integer>
            <key>AllowedProtocolMaskInDomesticRoaming</key>
            <integer>3</integer>
            <key>AllowedProtocolMaskInRoaming</key>
            <integer>3</integer>
            <key>AuthenticationType</key>
            <string>PAP</string>
            <key>DefaultProtocolMask</key>
            <integer>3</integer>
            <key>EnableXLAT464</key>
            <true />
            <key>Name</key>
            <string>${apn}</string>
            <key>ProxyServer</key>
            <string>${apn}</string>
            <key>Username</key>
            <string></string>
        </dict>
        <!-- Second APN -->
        <dict>
            <key>AllowedProtocolMask</key>
            <integer>1</integer>
            <key>AllowedProtocolMaskInDomesticRoaming</key>
            <integer>1</integer>
            <key>AllowedProtocolMaskInRoaming</key>
            <integer>1</integer>
            <key>AuthenticationType</key>
            <string>CHAP</string>
            <key>DefaultProtocolMask</key>
            <integer>1</integer>
            <key>EnableXLAT464</key>
            <false />
            <key>Name</key>
            <string>${apn}</string>
            <key>Username</key>
            <string></string>
        </dict>
    </array>
    <key>AttachAPN</key>
    <dict>
        <key>AllowedProtocolMask</key>
        <integer>3</integer>
        <key>AuthenticationType</key>
        <string>PAP</string>
        <key>Name</key>
        <string>${apn}</string>
        <key>Username</key>
        <string></string>
    </dict>
</dict>


<!-- VPN Settings -->
<dict>
    <key>PayloadDisplayName</key>
    <string>VPN</string>
    <key>PayloadIdentifier</key>
    <string>com.apple.vpn.managed.${generateUniqueUUID()}</string>
    <key>PayloadType</key>
    <string>com.apple.vpn.managed</string>
    <key>PayloadUUID</key>
    <string>${generateUniqueUUID()}</string>
    <key>PayloadVersion</key>
    <integer>1</integer>
    <key>UserDefinedName</key>
    <string>VPN Configuration</string>
    <key>VPNType</key>
    <string>IPSec</string>
    <key>IPSec</key>
    <dict>
        <key>AuthenticationMethod</key>
        <string>SharedSecret</string>
        <key>ExtendedAuthEnabled</key>
        <false/>
        <key>LocalIdentifier</key>
        <string>${apn}</string>
        <key>RemoteAddress</key>
        <string>vpn.example.com</string>
        <key>SharedSecret</key>
        <string>${generateUniqueUUID()}</string>
        <key>XAuthEnabled</key>
        <true/>
        <key>XAuthName</key>
        <string>${apn}</string>
        <key>XAuthPassword</key>
        <string>${apn}</string>
    </dict>
</dict>

<!-- Proxy Settings -->
<dict>
    <key>PayloadDisplayName</key>
    <string>Proxy</string>
    <key>PayloadIdentifier</key>
    <string>com.apple.proxy.${generateUniqueUUID()}</string>
    <key>PayloadType</key>
    <string>com.apple.proxy</string>
    <key>PayloadUUID</key>
    <string>${generateUniqueUUID()}</string>
    <key>PayloadVersion</key>
    <integer>1</integer>
    <key>HTTPEnable</key>
    <true/>
    <key>HTTPPort</key>
    <integer>8080</integer>
    <key>HTTPSEnable</key>
    <true/>
    <key>HTTPSPort</key>
    <integer>8080</integer>
    <key>FTPEnable</key>
    <true/>
    <key>FTPPort</key>
    <integer>21</integer>
    <key>SOCKSEnable</key>
    <true/>
    <key>SOCKSPort</key>
    <integer>1080</integer>
    <key>Server</key>
    <string>proxy.example.com</string>
    <key>ExclusionList</key>
    <array>
        <string>localhost</string>
        <string>127.0.0.1</string>
        <string>169.254.0.0/16</string>
    </array>
</dict>

<!-- Additional Settings -->
<dict>
    <key>PayloadDisplayName</key>
    <string>Additional Settings</string>
    <key>PayloadIdentifier</key>
    <string>com.example.additionalsettings.${generateUniqueUUID()}</string>
    <key>PayloadType</key>
    <string>Configuration</string>
    <key>PayloadUUID</key>
    <string>${generateUniqueUUID()}</string>
    <key>PayloadVersion</key>
    <integer>1</integer>
    <key>PayloadOrganization</key>
    <string>Github:AiGptCode</string>
    <key>PayloadRemovalDisallowed</key>
    <false/>
    <key>SignalBoostEnabled</key>
    <true/>
</dict>
</array>
<key>PayloadDisplayName</key>
<string>Configuration Profile</string>
<key>PayloadIdentifier</key>
<string>com.example.profile</string>
<key>PayloadRemovalDisallowed</key>
<false/>
<key>PayloadType</key>
<string>Configuration</string>
<key>PayloadUUID</key>
<string>${generateUniqueUUID()}</string>
<key>PayloadVersion</key>
<integer>1</integer>
</dict>
</plist>
`;

    // Create a Blob object from the configuration plist string
    const configBlob = new Blob([configPlist], { type: 'application/xml' });

    // Create a download link and click it to download the file
    const downloadLink = document.createElement('a');
    downloadLink.href = URL.createObjectURL(configBlob);
    downloadLink.download = 'config.mobileconfig';
    downloadLink.click();

    // Wait for the download to complete before revoking the object URL
    setTimeout(() => {
        URL.revokeObjectURL(downloadLink.href);
    }, 1000);
}

configForm.addEventListener('submit', handleFormSubmit);