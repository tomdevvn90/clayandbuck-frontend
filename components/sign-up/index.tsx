import Link from "next/link";
import Image from "next/image";
import LogoImg from "../../public/images/cb-vip-247.png";
import TwoManImg from "../../public/images/two-man.png";

export default function SignUp({ gift }) {
  return (
    <div className="sign-up-wrap">
      <div className="subscribe-left">
        <div className="cb247-subscribe">
          {gift ? <h2>Give the gift of C&B VIP</h2> : <h2>Subscribe to C&B VIP</h2>}

          <Image src={LogoImg} className="cnb-logo" alt="Clay and Buck" width={110} height={110} />

          {gift ? (
            <p>
              Give the gift of C&B VIP - the only way to listen to the show live or on-demand on your computer or mobile
              device commercial-free.
            </p>
          ) : (
            <p>
              Sign up to become a C&B VIP subscriber and listen to the show live or on-demand on your computer or mobile
              device commercial-free.
            </p>
          )}

          <div className="benefits">
            <h3>C&B VIP Members Benefits:</h3>
            <ul>
              <li>Commercial-Free Audio Stream, Live or On-Demand</li>
              <li>Commercial-Free Podcasts</li>
              <li>Exclusive VIP Invitations to C&B Events</li>
              <li>Exclusive Clay & Buck VIP Videos</li>
              <li>Exclusive email access directly to Clay & Buck</li>
            </ul>
          </div>
          <div className="two-friend">
            <Image className="two-friend-img" src={TwoManImg} alt="Clay and Buck" />
          </div>
        </div>
      </div>
      <div className="subscribe-right">
        <div className="create-account">
          {/* <div className="cnb-loading-sp">
            <div className="cnb-spinner-loading"></div>
          </div> */}

          {/* <div className="cnb-verify-success">
            <h4>Verify Your Email</h4>
            <p className="mail-verify-text">
              We sent an email to <a className="cnb-verified-email" href="#"></a>. Please check your email and verify
              your account to continue the subscription process. If you don’t see our email, you may need to check your
              junk folder.
            </p>
          </div> */}

          <div id="cnb-plan-step" className="create-account-step">
            <h4>Pick Your Plan</h4>

            {gift ? (
              <Link href="/cnb-sign-up/" className="highlight">
                Add a subscription to your account
              </Link>
            ) : (
              <p>
                You can change or cancel your plan anytime.{" "}
                <Link href="/cnb-sign-up-gift/" className="highlight">
                  Give as a gift
                </Link>
              </p>
            )}

            <div className="steper-form">
              <label htmlFor="cnb-plan" className="form-group-label">
                Select your plan:
              </label>
              {/* <?php
								 foreach (CNB_PLAN_INFO_LIST as $key => $plan) {
										 if ( $plan['active'] && strpos($plan['recurly_code'], 'gift') !== false ) {
												 $s_text = ($plan['interval_count'] > 1) ? 's' : '';
												 $plan_interval = cnb_get_plan_interval_text($plan['interval']);
												 $interval_text = $plan['interval_count'] . ' ' . $plan_interval . $s_text;
											 ?>
												 <div className="plan-radio gift">
													 <input className="form-check-input" type="radio" name="cnb_plan_id" id="cnb_plan_id_<?php echo $key+1; ?>" value="<?php echo $plan['_id']; ?>">
													 <label className="form-check-label label" htmlFor="cnb_plan_id_<?php echo $key+1; ?>">
														 <strong><?php echo $interval_text; ?> for $<?php echo $plan['amount']; ?></strong>
													 </label>
												 </div>
								 <?php }
								 } ?> */}

              {/* <?php
								 foreach (CNB_PLAN_INFO_LIST as $key => $plan) {
										 if ( $plan['active'] && strpos($plan['recurly_code'], 'gift') === false ) {
												 $s_text = ($plan['interval_count'] > 1) ? 's' : '';
												 $plan_interval = cnb_get_plan_interval_text($plan['interval']);
												 $interval_text = $plan['interval_count'] . ' ' . $plan_interval . $s_text;
											 ?>
												 <div class="plan-radio">
													 <input class="form-check-input" type="radio" name="cnb_plan_id" id="cnb_plan_id_<?php echo $key+1; ?>" value="<?php echo $plan['_id']; ?>">
													 <label class="form-check-label label" for="cnb_plan_id_<?php echo $key+1; ?>">
														 <strong><?php echo $interval_text; ?> for $<?php echo $plan['amount']; ?></strong>
														 <span>Auto-renews after <?php echo $interval_text; ?></span>
													 </label>
												 </div>
								 <?php }
								 } ?> */}

              <p className="error-msg"></p>
              <div className="btn-set-inline">
                <button className="btn btn-half btn-cancel-confirmation">Previous</button>
                <button className="btn btn-half btn-continue disabled">Continue</button>
              </div>
              <button className="btn btn-cancel btn-cancel-confirmation">Cancel</button>
            </div>
          </div>

          <div id="cnb-verify-email-step" className="cnb-verify-form">
            <h4>Create Your Account</h4>
            <form className="steper-form cnb-verify-gift-form">
              <p className="error-msg">Please enter a valid email.</p>
              <div className="form-group">
                <label htmlFor="cnb-email">Email</label>
                <input
                  type="email"
                  className="form-control"
                  id="cnb-email"
                  name="cnb-email"
                  aria-describedby="emailHelp"
                  placeholder="Enter your email address"
                  required
                />
              </div>
              <div className="btn-set-inline">
                <div className="btn btn-half btn-previous">Previous</div>
                <button type="submit" className="btn btn-half btn-submit disabled">
                  Submit
                </button>
              </div>
            </form>
            <button className="btn btn-cancel btn-cancel-confirmation">Cancel</button>
          </div>
        </div>
      </div>
    </div>
  );
}
