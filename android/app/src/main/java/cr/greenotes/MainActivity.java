package cr.greenotes;

import android.os.Build;
import android.os.Bundle;
import android.webkit.WebView;

import com.baumblatt.capacitor.firebase.auth.CapacitorFirebaseAuth;
import com.getcapacitor.BridgeActivity;
import com.getcapacitor.Plugin;

import java.util.ArrayList;
import java.util.List;

public class MainActivity extends BridgeActivity {

  @Override
  protected void init(Bundle savedInstanceState, List<Class<? extends Plugin>> plugins) {
    super.init(savedInstanceState, plugins);
    this.init(savedInstanceState, new ArrayList<Class<? extends Plugin>>() {{
      // Additional plugins you've installed go here
      // Ex: add(TotallyAwesomePlugin.class);
      add(CapacitorFirebaseAuth.class);
    }});
    if(Build.VERSION.SDK_INT >= Build.VERSION_CODES.KITKAT) {
      WebView.setWebContentsDebuggingEnabled(true);
    };
  }
}

