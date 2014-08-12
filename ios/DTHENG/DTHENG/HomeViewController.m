#import "HomeViewController.h"

// author : Daniel Thengvall

@interface HomeViewController ()

@end

@implementation HomeViewController

- (NSInteger)tableView:(UITableView *)tableView numberOfRowsInSection:(NSInteger)section {
    return 6;
}

- (UITableViewCell *)tableView:(UITableView *)tableView cellForRowAtIndexPath:(NSIndexPath *)indexPath {
    switch (indexPath.row) {
            
        case 0: {
            UITableViewCell *cell = [tableView dequeueReusableCellWithIdentifier:@"cell" forIndexPath:indexPath];
            UIImageView *profile = (UIImageView *)[cell viewWithTag:1];
            profile.image = [UIImage imageNamed:@"profile"];

            return cell;
        }
        case 1:
            return [tableView dequeueReusableCellWithIdentifier:@"resumeLink" forIndexPath:indexPath];
        case 2:
            return [tableView dequeueReusableCellWithIdentifier:@"blank" forIndexPath:indexPath];
        
        default: {
            
            UITableViewCell *cell = [tableView dequeueReusableCellWithIdentifier:@"socialLink" forIndexPath:indexPath];
            
            switch (indexPath.row) {
                case 3:
                    cell.textLabel.text = @"GitHub";
                    break;
                case 4:
                    cell.textLabel.text = @"AngelList";
                    break;
                case 5:
                    cell.textLabel.text = @"LinkedIn";
            }
            
            return cell;
            
        }


            
    }
}

- (void)tableView:(UITableView *)tableView didSelectRowAtIndexPath:(NSIndexPath *)indexPath {
    [tableView deselectRowAtIndexPath:indexPath animated:YES];
    switch (indexPath.row) {
        case 3:
            [[UIApplication sharedApplication] openURL:[NSURL URLWithString:@"https://github.com/DTHENG"]];
            break;
        case 4:
            [[UIApplication sharedApplication] openURL:[NSURL URLWithString:@"https://angel.co/daniel-thengvall"]];
            break;
        case 5:
            [[UIApplication sharedApplication] openURL:[NSURL URLWithString:@"http://lnkd.in/bD6S_7J"]];
    }
}

- (CGFloat)tableView:(UITableView *)tableView heightForRowAtIndexPath:(NSIndexPath *)indexPath {
    switch (indexPath.row) {
        case 0:
            return 386;
        case 2:
            return 5;
        default:
            return 60;
    }
}
@end
